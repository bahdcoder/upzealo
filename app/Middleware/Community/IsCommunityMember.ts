import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotAMemberException from 'App/Exceptions/Community/NotAMemberException'
import Community from 'App/Models/Community/Community'
import Membership, { MembershipStatus } from 'App/Models/Community/Membership'

export default class IsCommunityMember {
  public async handle({ auth, params }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.use('jwt').user!

    if (!params.community) {
      return await next()
    }

    const community = await Community.findOrFail(params.community)

    // If is community owner, allow access
    if (community.userId === user.id) {
      return await next()
    }

    // if has membership, allow access
    const membership = await Membership.query()
      .where('userId', user.id)
      .where('communityId', community.id)
      .where('status', MembershipStatus.APPROVED)
      .first()

    if (!membership) {
      throw new NotAMemberException('Not a community member.', 400, 'E_NOT_A_MEMBER')
    }

    await next()
  }
}
