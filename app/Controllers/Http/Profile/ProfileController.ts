import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Profile/User'

export default class ProfileController {
  public async show({ params, auth }: HttpContextContract) {
    const authUser = auth.user!

    const user = await User.query()
      .where('username', params.username)
      .preload('addresses')
      .preload('socialAccounts')
      .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
      .preload('badges', (badgesQuery) => badgesQuery.preload('tags'))
      .preload('tags')
      .firstOrFail()

    const [profile] = await User.loadFollowersAndFollowingCount([user])

    await authUser.attachFollowStatus([profile])

    return {
      profile: profile.serialize(),
    }
  }
}
