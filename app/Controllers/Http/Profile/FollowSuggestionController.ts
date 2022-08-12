import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Profile/User'

export default class FollowSuggestionController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!

    const firstFiftyUsers = await User.query()
      .orderBy('created_at', 'desc')
      .preload('badges')
      .preload('tags')
      .preload('addresses')
      .limit(50)

    const users = await user.attachFollowStatus(firstFiftyUsers)

    return { users: users.map((user) => user.serialize()) }
  }
}
