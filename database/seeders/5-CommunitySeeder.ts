import Badge from 'App/Models/Profile/Badge'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CommunityFactory from 'Database/factories/Community/CommunityFactory'

export function randomItem(items: any[]) {
  // [Math.floor(Math.random() * coverImages.length)]
  return items[Math.floor(Math.random() * items.length)]
}

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const badges = await Badge.all()

    const communities = await CommunityFactory.with('memberships', 10, (membershipFactory) => {
      membershipFactory.with('user', 1)
    })
      .with('user')
      .createMany(10)

    for (let index = 0; index < communities.length; index++) {
      const community = communities[index]

      await community.related('badges').sync([randomItem(badges).id])
    }
  }
}
