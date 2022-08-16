import Community, { CommunityMembershipTypes } from 'App/Models/Community/Community'
import Factory from '@ioc:Adonis/Lucid/Factory'

import UserFactory from 'Database/factories/Profile/UserFactory'
import SocialAccountFactory from 'Database/factories/Profile/SocialAccountFactory'
import MembershipFactory from './MembershipFactory'

export default Factory.define(Community, ({ faker }) => {
  return {
    name: faker.lorem.sentence(2),
    description: faker.lorem.paragraph(),
    rules: faker.lorem.text(),
    coverImage: faker.image.imageUrl(),
    logoImage: faker.image.imageUrl(),
    membershipType: CommunityMembershipTypes.WALLET_TOKENS,
  }
})
  .state(
    'tokens',
    (community) => (community.membershipType = CommunityMembershipTypes.WALLET_TOKENS)
  )
  .state(
    'invites',
    (community) => (community.membershipType = CommunityMembershipTypes.INVITE_ONLY)
  )
  .relation('socialAccounts', () => SocialAccountFactory)
  .relation('memberships', () => MembershipFactory)
  .relation('user', () => UserFactory)
  .build()
