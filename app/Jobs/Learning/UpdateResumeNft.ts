import User from 'App/Models/Profile/User'
import { JobContract } from '@ioc:Rocketseat/Bull'
import Enrolment from 'App/Models/Learning/Enrolment'
import { Edge } from 'edge.js'
import { join } from 'path'
import bs58 from 'bs58'
import Puppeteer from 'puppeteer'
import Fs from 'fs'
import ExternalCertification from 'App/Models/Learning/ExternalCertification'
import { toMetaplexFile } from '@metaplex-foundation/js'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Bot from 'App/Models/Profile/Bot'
import { Keypair } from '@solana/web3.js'
import NodeFetch from 'node-fetch'
import { SolanaProgram } from 'App/Services/SolanaProgram'
import Logger from '@ioc:Adonis/Core/Logger'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class UpdateResumeNft implements JobContract {
  public key = 'Learning/UpdateResumeNft'

  public async handle(job) {
    const { data } = job
    Logger.info(`${this.key} job invoked with data`, data)
    const edge = new Edge({ cache: false })
    edge.mount(join(__dirname, '..', 'Views'))

    Logger.info('finding user')

    const user = await User.query()
      .where('id', data.user)
      .preload('addresses')
      .preload('socialAccounts')
      .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
      .preload('badges', (badgesQuery) => badgesQuery.preload('tags'))
      .preload('tags', (tagQuery) => tagQuery.preload('badge'))
      .firstOrFail()

    Logger.info('found user. finding user enrolments.')

    const enrolments = await Enrolment.query()
      .where('user_id', user.id)
      .whereNotNull('completed_at')
      .preload('course', (courseQuery) =>
        courseQuery.preload('sections', (sectionQuery) =>
          sectionQuery
            .preload('skills', (skillQuery) => skillQuery.orderBy('index', 'desc'))
            .orderBy('index', 'desc')
        )
      )

    Logger.info('found enrolments. finding external certificates')
    const externalCertifications = await ExternalCertification.query()
      .where('userId', user.id)
      .preload('certifier', (certifierQuery) => certifierQuery.preload('skills'))

    Logger.info('found external certifcates. finding external courses.')

    const externalCourses = externalCertifications.map((cert) => {
      return {
        title: cert.certifierCourse,
        skills: cert.certifier.skills.filter(
          (skill) => skill.certifierCourse === cert.certifierCourse
        ),
        certificationAuthority: cert.certifier.name,
      }
    })

    const internalCourses = enrolments.map((enrolment) => {
      return {
        title: enrolment.course.title,
        description: enrolment.course.details,
        skills: enrolment.course.sections.reduce(
          (skills, section) => [...skills, ...section.skills],
          []
        ),
        certificationAuthority: 'Upzealo',
      }
    })

    Logger.info('found external courses. generating html with edge')

    const html = await edge.render('resume', {
      profile: user.serialize(),
      courses: [
        ...enrolments.map((enrolment) => {
          return {
            title: enrolment.course.title,
            description: enrolment.course.details,
            skills: enrolment.course.sections.reduce(
              (skills, section) => [...skills, ...section.skills],
              []
            ),
            certificationAuthority: 'Upzealo',
          }
        }),
        ...externalCourses,
      ],
    })

    Logger.info('generated html. launching puppeteer and generating pdf')

    const browser = await Puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    const now = Date.now()

    await page.pdf({
      path: join(__dirname, 'resumes', `${now}.pdf`),
      printBackground: true,
    })

    Logger.info('done rendering pdf. now generating nft')

    const bot = await Bot.firstOrFail()

    const decryptedSecretKey = Encryption.decrypt<string>(bot.secretKey)!

    const wallet = Keypair.fromSecretKey(bs58.decode(decryptedSecretKey))

    const avatarBufferResponse = await NodeFetch(user.avatarUrl)
    const avatarBuffer = await avatarBufferResponse.arrayBuffer()

    const file = toMetaplexFile(
      Fs.readFileSync(join(__dirname, 'resumes', `${now}.pdf`)),
      `${now}.pdf`
    )

    const split = user.avatarUrl.split('.')

    const avatarFile = toMetaplexFile(avatarBuffer, `${user.id}.${split[split.length - 1]}`)

    const attributes = [
      ...internalCourses.map((course) => ({
        course: course.title,
        skills: course.skills.map((skill) => skill.name),
        certificationAuthority: course.certificationAuthority,
        verified: true,
      })),
      ...externalCourses.map((cert) => ({
        course: cert.title,
        certificationAuthority: cert.certificationAuthority,
        skills: cert.skills.map((skill) => skill.name),
        verified: true,
      })),
    ]

    const nftName = `${user.username} Soulbound Resume`

    if (user.resumeMint) {
      const { resumePdf, uri } = await SolanaProgram.updateNft(
        wallet,
        user.resumeMint,
        {
          file,
          avatarFile,
        },
        nftName,
        attributes
      )

      user.resumePdf = resumePdf
      user.resumeUrl = uri

      await user.save()

      return
    }

    const { resumePdf, uri, mint } = await SolanaProgram.uploadNft(
      wallet,
      user.addresses[0].publicKey,
      { file, avatarFile },
      nftName,
      attributes
    )

    user.resumeMint = mint
    user.resumePdf = resumePdf
    user.resumeUrl = uri

    await user.save()
  }
}
