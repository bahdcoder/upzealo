import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Community, { CommunityMembershipTypes } from 'App/Models/Community/Community'

import Redis from '@ioc:Adonis/Addons/Redis'
import { PublicKey } from '@solana/web3.js'
import CannotCreateCommunityException from 'App/Exceptions/Community/CannotCreateCommunityException'

export default class CreateCommunityController {
  public async handler({ request, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const {
      name,
      description,
      rules: communityRules,
      coverImage,
      logoImage,
      membershipType,
      tokensList,
    } = await request.validate({
      schema: schema.create({
        name: schema.string([rules.required(), rules.maxLength(255)]),
        description: schema.string([rules.required(), rules.maxLength(1200)]),
        rules: schema.string([rules.required(), rules.maxLength(1200)]),
        coverImage: schema.string([rules.url()]),
        logoImage: schema.string([rules.url()]),
        membershipType: schema.enum(
          [CommunityMembershipTypes.INVITE_ONLY, CommunityMembershipTypes.WALLET_TOKENS] as const,
          [rules.required()]
        ),
        tokensList: schema
          .array([rules.required(), rules.minLength(1), rules.maxLength(12000)])
          .members(schema.string([])),
      }),
    })

    if (membershipType === CommunityMembershipTypes.WALLET_TOKENS) {
      // Validate tokens list.

      if (!tokensList.every((token) => PublicKey.isOnCurve(token))) {
        throw new CannotCreateCommunityException(
          'Invalid tokens list uploaded',
          400,
          'E_INVALID_TOKEN_LIST'
        )
      }
    }

    const community = await Community.create({
      name,
      description,
      coverImage,
      logoImage,
      membershipType,
      rules: communityRules,
      userId: user.id,
    })

    if (membershipType === CommunityMembershipTypes.WALLET_TOKENS) {
      const key = community.TOKENS_HASHLIST_KEY()

      await Redis.sadd(key, tokensList)
    }

    return community.toJSON()
  }
}
