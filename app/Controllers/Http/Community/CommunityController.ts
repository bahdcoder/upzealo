import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Community from 'App/Models/Community/Community'
import Membership, { MembershipStatus } from 'App/Models/Community/Membership'
import { baseUrl } from 'Config/app'

export default class CommunitiesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const communities = await Community.query().preload('user').paginate(page, perPage)

    communities.baseUrl(`${baseUrl}/communities`)

    return communities
  }

  public async self({ params, request, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const memberships = await Membership.query()
      .where('userId', user.id)
      .where('status', MembershipStatus.APPROVED)
      .preload('community')
      .paginate(page, perPage)

    memberships.baseUrl(`${baseUrl}/communities/${params.community}/memberships`)

    const paginatedMemberships = memberships.toJSON()

    return {
      ...paginatedMemberships,
      data: paginatedMemberships.data.map((membership) => membership.community),
    }
  }
}
