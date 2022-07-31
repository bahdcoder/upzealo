import Redis from '@ioc:Adonis/Addons/Redis'
import { Wallet } from 'App/Blockchain/Wallet'
import Community from 'App/Models/Community/Community'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Membership, { MembershipStatus } from 'App/Models/Community/Membership'
import CannotJoinCommunityException from 'App/Exceptions/Community/CannotJoinCommunityException'

export default class RequestToJoinCommunitiesController {
  public async handler({ auth, params }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const community = await Community.findOrFail(params.community)

    await user.load('addresses')

    const address = user.addresses.find((address) => address.isDefault)!

    const accounts = await new Wallet(address.publicKey).getAllSplTokens()

    const whitelistedTokens = await Redis.smembers(community.TOKENS_HASHLIST_KEY())

    const holdsAtleastOneToken = whitelistedTokens.some((whitelistToken) =>
      accounts.find((account) => account.mint === whitelistToken)
    )

    if (!holdsAtleastOneToken) {
      throw new CannotJoinCommunityException('Wallet not whitelisted.', 400, 'E_NOT_WHITELISTED')
    }

    const membership = await Membership.create({
      communityId: community.id,
      userId: user.id,
      status: MembershipStatus.APPROVED,
    })

    return { membership }
  }
}
