import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Wallet } from 'App/Blockchain/Wallet'

export default class WalletController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load('addresses')

    const address = user.addresses[0]

    const accounts = await new Wallet(address.publicKey).getAllSupportedSplTokens()

    return { accounts }
  }
}
