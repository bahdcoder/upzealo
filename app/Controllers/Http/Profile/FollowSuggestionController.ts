import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Profile/User'

export default class FollowSuggestionController {
  public async index({ auth, request }: HttpContextContract) {
    const user = auth.user!
    const perPage = parseInt(request.input('perPage', 100))

    const firstFiftyUsers = await User.query()
      .orderBy('created_at', 'desc')
      .preload('badges')
      .preload('tags')
      .whereNot('id', user.id)
      .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
      .preload('addresses')
      .whereNotNull('username')
      .limit(100)

    let users = await user.attachFollowStatus(firstFiftyUsers)
    users = await User.loadFollowersAndFollowingCount(users)

    return {
      users: users.filter((user) => user.$extras['isFollowing'] === false).slice(0, perPage + 1),
    }
  }
}
