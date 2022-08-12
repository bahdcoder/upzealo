import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Profile/User'

export default class FollowSuggestionController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!

    const firstFiftyUsers = await User.query()
      .orderBy('created_at', 'desc')
      .preload('badges')
      .preload('tags')
      .whereNot('id', user.id)
      .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
      .preload('addresses')
      .limit(50)

    let users = await user.attachFollowStatus(firstFiftyUsers)
    users = await User.loadFollowersAndFollowingCount(users)

    return { users }
  }
}
