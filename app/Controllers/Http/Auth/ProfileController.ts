import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileController {
  public async handler({ auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    await user.load((loader) => {
      loader.load('addresses').load('socialAccounts')
    })

    return user.toJSON()
  }
}
