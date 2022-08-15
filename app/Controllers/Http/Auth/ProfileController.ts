import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Profile/User'

export default class ProfileController {
  public async handler({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load((loader) => {
      loader
        .load('addresses')
        .load('socialAccounts')
        .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
        .load('badges', (badgesQuery) => badgesQuery.preload('tags'))
        .load('tags')
    })

    const [updatedUser] = await User.loadFollowersAndFollowingCount([user])

    return updatedUser.toJSON()
  }
}
