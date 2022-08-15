import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Certifier from 'App/Models/Learning/Certifier'
import Skill from 'App/Models/Learning/Skill'
import Address from 'App/Models/Profile/Address'
import Bull from '@ioc:Rocketseat/Bull'
import UpdateResumeNft from 'App/Jobs/Learning/UpdateResumeNft'
import ExternalCertification from 'App/Models/Learning/ExternalCertification'

export default class CertifierController {
  public async store({ request }: HttpContextContract) {
    const { apiKey, skills, publicKey, course } = await request.validate({
      schema: schema.create({
        apiKey: schema.string([rules.required()]),
        skills: schema.array([rules.minLength(1)]).members(schema.string([rules.required()])),
        publicKey: schema.string([rules.required()]),
        course: schema.string([rules.required()]),
      }),
    })

    const address = await Address.query().where('publicKey', publicKey).firstOrFail()
    const certifier = await Certifier.query().where('apiKey', apiKey).firstOrFail()

    for (let index = 0; index < skills.length; index++) {
      const skillName = skills[index]
      const exists = await Skill.query()
        .where('certifierCourse', course)
        .where('name', skillName)
        .first()

      if (!exists) {
        await Skill.create({
          name: skillName,
          certifierCourse: course,
          certifierId: certifier.id,
        })
      }
    }

    await ExternalCertification.create({
      userId: address.userId,
      certifierId: certifier.id,
      certifierCourse: course,
    })

    Bull.add(new UpdateResumeNft().key, {
      user: address.userId,
    })

    return { message: 'Ok' }
  }
}
