import Section from 'App/Models/Learning/Section'

import Factory from '@ioc:Adonis/Lucid/Factory'

import CourseFactory from 'Database/factories/Learning/CourseFactory'
import LessonFactory from 'Database/factories/Learning/LessonFactory'

export default Factory.define(Section, ({ faker }) => {
  return {
    title: faker.lorem.sentence(4),
    details: faker.lorem.text(),
  }
})
  .relation('course', () => CourseFactory)
  .relation('lessons', () => LessonFactory)
  .build()
