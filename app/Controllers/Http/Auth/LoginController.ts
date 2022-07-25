import Base58 from 'bs58'
import Nacl from 'tweetnacl'
import { TextEncoder } from 'util'
import { blockchain } from 'Config/app'
import { PublicKey } from '@solana/web3.js'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Address from 'App/Models/Profile/Address'
import UnauthenticatedException from 'App/Exceptions/Auth/UnauthenticatedException'

export default class LoginController {
  public async handler({ request, auth }: HttpContextContract) {
    const { publicKey: publicKeyBase58, signature: signatureBase58 } = await request.validate({
      schema: schema.create({
        publicKey: schema.string([rules.required()]),
        signature: schema.string([rules.required()]),
      }),
    })

    const signature = Base58.decode(signatureBase58)

    const publicKey = new PublicKey(publicKeyBase58)

    const validSignature = Nacl.sign.detached.verify(
      new TextEncoder().encode(blockchain.authenticationSignatureTemplate()),
      signature,
      publicKey.toBytes()
    )

    if (!validSignature) {
      throw new UnauthenticatedException('Invalid signature.', 401, 'E_INVALID_SIGNATURE')
    }

    const address = await Address.query()
      .where('publicKey', publicKey.toBase58())
      .preload('user')
      .first()

    if (!address) {
      throw new UnauthenticatedException('Address does not exist.', 401, 'E_ADRESS_DOES_NOT_EXIST')
    }

    const { accessToken } = await auth.use('jwt').generate(address.user)

    return { accessToken }
  }
}
