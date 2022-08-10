import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Address from 'App/Models/Profile/Address'

export default class CheckUserExistsController {
  public async handler({ params }: HttpContextContract) {
    const address = await Address.query().where('public_key', params.publicKey).first()

    if (!address) {
      return {
        userId: undefined,
      }
    }

    return {
      userId: address?.userId,
    }
  }
}
