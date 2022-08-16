import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Community from 'App/Models/Community/Community'
import Membership, { MembershipStatus } from 'App/Models/Community/Membership'
import { baseUrl } from 'Config/app'

export default class CommunityController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 25)

    const communities = await Community.query()
      .preload('user')
      .preload('badges')
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    communities.baseUrl(`${baseUrl}/communities`)

    return communities
  }

  public async show({ params }: HttpContextContract) {
    const community = await Community.query()
      .where('id', params.community)
      .preload('user')
      .preload('badges')
      .orderBy('created_at', 'desc')
      .withCount('memberships')
      .firstOrFail()

    return { community }
  }

  public async self({ params, request, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const memberships = await Membership.query()
      .where('userId', user.id)
      .where('status', MembershipStatus.APPROVED)
      .preload('community', (communityQuery) => {
        communityQuery.withCount('memberships')
      })
      .paginate(page, perPage)

    memberships.baseUrl(`${baseUrl}/communities/${params.community}/memberships`)

    const ownedCommunities = await Community.query()
      .where('userId', user.id)
      .withCount('memberships')

    const paginatedMemberships = memberships.toJSON()

    return {
      data: [
        ...paginatedMemberships.data.map((membership) => membership.community),
        ...ownedCommunities,
      ],
    }
  }
}
