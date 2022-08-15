import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Follow from 'App/Models/Feed/Follow'
import Badge from 'App/Models/Profile/Badge'
import UserFactory from 'Database/factories/Profile/UserFactory'

function getMultipleRandom(arr: any[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())

  return shuffled.slice(0, num)
}

export default class extends BaseSeeder {
  public async run() {
    const badges = (await Badge.all()).map((badge) => badge.id)

    const users = await UserFactory.with('experiences', 4, (experienceFactory) => {
      experienceFactory.apply('current').with('organisation', 1)
    })
      .with('experiences', 3, (experienceFactory) => {
        experienceFactory.with('organisation', 1, (organisationFactory) => {
          organisationFactory.apply('verified')
        })
      })
      .with('addresses', 2)
      .with('addresses', 1, (addressFactory) => {
        addressFactory.apply('default')
      })
      .with('communities', 1, (communityFactory) => {
        communityFactory.apply('tokens')
      })
      .with('enrolments', 1, (enrolmentFactory) => {
        enrolmentFactory.with('course', 1, (courseFactory) => {
          courseFactory
            .merge({
              badgeId: badges[Math.floor(Math.random() * badges.length)],
            })
            .apply('published')
            .with('sections', 2, (section) =>
              section.apply('published').with('lessons', 5, (lesson) => lesson.apply('published'))
            )
            .with('author', 1, (authorFactory) => authorFactory.with('user'))
            .with('path', 1, (pathFactory) => {
              pathFactory.with('courses', 4, (pathCourseFactory) => {
                pathCourseFactory
                  .apply('published')
                  .with('sections', 5, (section) =>
                    section
                      .apply('published')
                      .with('lessons', 5, (lesson) => lesson.apply('published'))
                  )
              })
            })
        })
      })
      .createMany(50)

    console.log('Done seeding. Setting up follows.')

    const entities: Partial<ModelAttributes<InstanceType<typeof Follow>>>[] = []

    for (let index = 0; index < users.length; index++) {
      const user = users[index]
      const randomTwentyFiveUsers = getMultipleRandom(users, 5)
      entities.push(
        ...randomTwentyFiveUsers.map((target) => ({
          targetId: target.id,
          userId: user.id,
        }))
      )
    }

    console.log('Done with entities. Beginning insert.')

    await Follow.createMany(entities)
  }
}
