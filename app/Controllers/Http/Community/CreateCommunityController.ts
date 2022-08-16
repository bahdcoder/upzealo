import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Community, { CommunityMembershipTypes } from 'App/Models/Community/Community'

import Redis from '@ioc:Adonis/Addons/Redis'
import { PublicKey } from '@solana/web3.js'
import CannotCreateCommunityException from 'App/Exceptions/Community/CannotCreateCommunityException'

export default class CreateCommunityController {
  public async handler({ request, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const { name, description, tokensList, badgeId } = await request.validate({
      schema: schema.create({
        name: schema.string([rules.required(), rules.maxLength(255)]),
        description: schema.string([rules.required(), rules.maxLength(1200)]),
        badgeId: schema.string([
          rules.required(),
          rules.exists({
            table: 'badges',
            column: 'id',
          }),
        ]),
        tokensList: schema
          .array([rules.required(), rules.minLength(1), rules.maxLength(12000)])
          .members(schema.string([])),
      }),
    })

    if (!tokensList.every((token) => PublicKey.isOnCurve(token))) {
      throw new CannotCreateCommunityException(
        'Invalid tokens list uploaded',
        400,
        'E_INVALID_TOKEN_LIST'
      )
    }

    const community = await Community.create({
      name,
      description,
      userId: user.id,
      membershipType: CommunityMembershipTypes.WALLET_TOKENS,
    })

    await community.related('badges').sync([badgeId])

    await Redis.sadd(community.TOKENS_HASHLIST_KEY(), tokensList)

    return community.toJSON()
  }
}
