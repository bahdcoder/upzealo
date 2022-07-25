import Enrolment from 'App/Models/Learning/Enrolment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

import UserFactory from 'Database/factories/Profile/UserFactory'
import CourseFactory from 'Database/factories/Learning/CourseFactory'

export default Factory.define(Enrolment, ({ faker }) => {
  return {
    completedAt: DateTime.fromJSDate(faker.date.past()),
  }
})
  .relation('course', () => CourseFactory)
  .relation('user', () => UserFactory)
  .build()
