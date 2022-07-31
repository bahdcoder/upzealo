import { baseUrl } from 'Config/app'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Membership, { MembershipStatus } from 'App/Models/Community/Membership'

export default class MembershipController {
  public async index({ params, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const users = await Membership.query()
      .where('communityId', params.community)
      .where('status', MembershipStatus.APPROVED)
      .preload('user', (query) => query.preload('addresses').preload('socialAccounts'))
      .paginate(page, perPage)

    users.baseUrl(`${baseUrl}/communities/${params.community}/memberships`)

    const paginatedUsers = users.toJSON()

    return {
      ...paginatedUsers,
      data: paginatedUsers.data.map((membership) => membership.user),
    }
  }
}
