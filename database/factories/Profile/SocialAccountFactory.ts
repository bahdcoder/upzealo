import Factory from '@ioc:Adonis/Lucid/Factory'

import SocialAccount, { SupportedSocialNetworks } from 'App/Models/Profile/SocialAccount'
import UserFactory from 'Database/factories/Profile/UserFactory'

const supportedSocialNetworks = [
  SupportedSocialNetworks.DISCORD,
  SupportedSocialNetworks.LINKEDIN,
  SupportedSocialNetworks.TWITTER,
]

export default Factory.define(SocialAccount, ({ faker }) => {
  return {
    blockchain: supportedSocialNetworks[Math.floor(Math.random() * supportedSocialNetworks.length)],
    username: faker.internet.userName(),
    avatarUrl: faker.image.avatar(),
    accessToken: faker.internet.password(),
    networkId: faker.random.numeric(16),
  }
})
  .relation('user', () => UserFactory)
  .build()
