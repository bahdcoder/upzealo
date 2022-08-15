import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/Profile/User'
import PostFactory from 'Database/factories/Feed/PostFactory'

export function randomItem(items: any[]) {
  // [Math.floor(Math.random() * coverImages.length)]
  return items[Math.floor(Math.random() * items.length)]
}

export default class extends BaseSeeder {
  public async run() {
    const users = await User.all()

    // create 5 posts for each user

    for (let index = 0; index < users.length; index++) {
      const user = users[index]

      await PostFactory.merge({
        userId: user.id,
      })
        .with('attachments', 1)
        .with('comments', 2, (commentQuery) =>
          commentQuery.merge({
            userId: randomItem(users).id,
          })
        )
        .createMany(5)
    }
  }
}
