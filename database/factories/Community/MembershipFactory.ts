import Membership, { MembershipStatus } from 'App/Models/Community/Membership'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from '../Profile/UserFactory'
import CommunityFactory from './CommunityFactory'

export default Factory.define(Membership, () => {
  return {
    status: MembershipStatus.APPROVED,
  }
})
  .relation('user', () => UserFactory)
  .relation('community', () => CommunityFactory)
  .build()
