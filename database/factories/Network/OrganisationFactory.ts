import Factory from '@ioc:Adonis/Lucid/Factory'

import Organisation from 'App/Models/Network/Organisation'

import CommunityFactory from 'Database/factories/Community/CommunityFactory'
import UserFactory from 'Database/factories/Profile/UserFactory'
import { DateTime } from 'luxon'

const logos = [
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316010/company-logos/volicity-9.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316010/company-logos/towers.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316009/company-logos/tvit.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316009/company-logos/u-mark.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316009/company-logos/treva.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316009/company-logos/muszica.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316009/company-logos/nira.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316008/company-logos/lighting.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316008/company-logos/solaytic.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316008/company-logos/tower.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316008/company-logos/leaf.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316007/company-logos/hexa.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316007/company-logos/kyan.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316007/company-logos/ideaa.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316007/company-logos/earth.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316006/company-logos/hex-lab.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316006/company-logos/fox-hub.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316006/company-logos/fossa.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316005/company-logos/aven.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316005/company-logos/a-lab.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316005/company-logos/atica.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316005/company-logos/circle.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660316005/company-logos/cod-lab.png',
]

export default Factory.define(Organisation, ({ faker }) => {
  return {
    name: faker.company.companyName(),
    imageUrl: logos[Math.floor(Math.random() * logos.length)],
    verifiedAt: null,
  }
})
  .state(
    'verified',
    (organisation, { faker }) => (organisation.verifiedAt = DateTime.fromJSDate(faker.date.past()))
  )
  .relation('community', () => CommunityFactory)
  .relation('user', () => UserFactory)
  .build()
