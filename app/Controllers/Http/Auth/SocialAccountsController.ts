import SocialAccount from 'App/Models/Profile/SocialAccount'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SocialAccountsController {
  public async handler(ctx: HttpContextContract) {
    const { ally, response, params } = ctx

    const driver = ally.use(params.network)

    if (driver.hasError()) {
      return response.redirect('/')
    }

    const socialUser = await driver.user()

    await SocialAccount.firstOrCreate(
      {
        networkId: socialUser.id,
      },
      {
        network: params.network,
        networkId: socialUser.id,
        username: socialUser.nickName,
        accessToken: socialUser.token.token,
        avatarUrl: socialUser.avatarUrl || undefined,
      }
    )

    return response.json([])
  }
}
