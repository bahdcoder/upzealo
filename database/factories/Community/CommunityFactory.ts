import Community, { CommunityMembershipTypes } from 'App/Models/Community/Community'
import Factory from '@ioc:Adonis/Lucid/Factory'

import UserFactory from 'Database/factories/Profile/UserFactory'
import SocialAccountFactory from 'Database/factories/Profile/SocialAccountFactory'

const membershipTypes = [
  CommunityMembershipTypes.INVITE_ONLY,
  CommunityMembershipTypes.WALLET_TOKENS,
]

export default Factory.define(Community, ({ faker }) => {
  return {
    name: faker.lorem.sentence(3),
    description: faker.lorem.text(),
    rules: faker.lorem.text(),
    coverImage: faker.image.imageUrl(),
    logoImage: faker.image.imageUrl(),
    membershipType: membershipTypes[Math.floor(Math.random() * membershipTypes.length)],
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
  .relation('user', () => UserFactory)
  .build()
