import { DateTime } from 'luxon'
import Section from 'App/Models/Learning/Section'

import Factory from '@ioc:Adonis/Lucid/Factory'

import SkillFactory from 'Database/factories/Learning/SkillFactory'
import CourseFactory from 'Database/factories/Learning/CourseFactory'
import LessonFactory from 'Database/factories/Learning/LessonFactory'

export default Factory.define(Section, ({ faker }) => {
  return {
    title: faker.lorem.sentence(4),
    details: faker.lorem.text(),
    publishedAt: null,
    index: faker.datatype.number({ min: 0, max: 50 }),
  }
})
  .state(
    'published',
    (lesson, { faker }) => (lesson.publishedAt = DateTime.fromJSDate(faker.date.past()))
  )
  .relation('course', () => CourseFactory)
  .relation('lessons', () => LessonFactory)
  .relation('skills', () => SkillFactory)
  .build()
