import Base58 from 'bs58'
import Nacl from 'tweetnacl'
import { TextEncoder } from 'util'
import { blockchain } from 'Config/app'
import { PublicKey } from '@solana/web3.js'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Bull from '@ioc:Rocketseat/Bull'

import Getstream from 'App/Services/Getstream'

import Application from '@ioc:Adonis/Core/Application'

import User from 'App/Models/Profile/User'
import Address from 'App/Models/Profile/Address'
import CannotJoinException from 'App/Exceptions/Auth/CannotJoinException'

import CreateSolanaAccount from 'App/Jobs/Profile/CreateSolanaAccount'
import FollowBotAccount from 'App/Jobs/Profile/FollowBotAccount'

export default class JoinController {
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
      throw new CannotJoinException('Invalid signature.', 401, 'E_INVALID_SIGNATURE')
    }

    const addressExists = await Address.findBy('publicKey', publicKey.toBase58())

    if (addressExists) {
      throw new CannotJoinException('Address already registered.', 401, 'E_ADRESS_REGISTERED')
    }

    let user = await User.create({})

    await Address.create({
      publicKey: publicKey.toBase58(),
      isDefault: true,
      userId: user.id,
    })

    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    const { accessToken } = await auth.use('jwt').generate(user)

    await user.load((loader) => {
      loader
        .load('addresses')
        .load('socialAccounts')
        .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
        .load('badges', (badgesQuery) => badgesQuery.preload('tags'))
        .load('tags')
    })

    const [serialisedUser] = await User.loadFollowersAndFollowingCount([user])

    Bull.add(new CreateSolanaAccount().key, {
      user: user.id,
    })

    Bull.add(new FollowBotAccount().key, {
      user: user.id,
    })

    return {
      accessToken,
      user: serialisedUser,
      streamAccessToken: getstream.accessToken(user.id),
    }
  }
}
