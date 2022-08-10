import User from 'App/Models/Profile/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckUsernameExistsController {
  public async handler({ params }: HttpContextContract) {
    const user = await User.query().where('username', params.username).first()

    return {
      usernameAvailable: user === null,
    }
  }
}
