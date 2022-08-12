import { DateTime } from 'luxon'

import User from 'App/Models/Profile/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

import AddressFactory from 'Database/factories/Profile/AddressFactory'
import EnrolmentFactory from 'Database/factories/Learning/EnrolmentFactory'
import ExperienceFactory from 'Database/factories/Network/ExperienceFactory'
import CommunityFactory from 'Database/factories/Community/CommunityFactory'
import SocialAccountFactory from 'Database/factories/Profile/SocialAccountFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
  }
})
  .relation('enrolments', () => EnrolmentFactory)
  .relation('socialAccounts', () => SocialAccountFactory)
  .relation('addresses', () => AddressFactory)
  .relation('experiences', () => ExperienceFactory)
  .relation('communities', () => CommunityFactory)
  .state(
    'verified',
    (user, { faker }) => (user.verifiedAt = DateTime.fromJSDate(faker.date.past()))
  )
  .build()
