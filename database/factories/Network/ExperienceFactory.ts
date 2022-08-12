import { DateTime } from 'luxon'

import Factory from '@ioc:Adonis/Lucid/Factory'

import Experience from 'App/Models/Network/Experience'
import OrganisationFactory from 'Database/factories/Network/OrganisationFactory'
import UserFactory from 'Database/factories/Profile/UserFactory'

export default Factory.define(Experience, ({ faker }) => {
  const pair = [
    faker.date.between(
      DateTime.now().minus({ years: 10 }).toJSDate(),
      DateTime.now().minus({ years: 5 }).toJSDate()
    ),
    faker.date.between(
      DateTime.now().minus({ years: 3 }).toJSDate(),
      DateTime.now().minus({ years: 1 }).toJSDate()
    ),
  ]

  return {
    title: faker.name.jobTitle(),
    startedAt: DateTime.fromJSDate(pair[0]),
    endedAt: DateTime.fromJSDate(pair[1]),
  }
})
  .state('current', (experience) => (experience.endedAt = null))
  .relation('organisation', () => OrganisationFactory)
  .relation('user', () => UserFactory)
  .build()
