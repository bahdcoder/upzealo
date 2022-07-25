import { DateTime } from 'luxon'
import Lesson, { LessonType } from 'App/Models/Learning/Lesson'
import Factory from '@ioc:Adonis/Lucid/Factory'
import SectionFactory from './SectionFactory'

const lessonTypes = [LessonType.ARTICLE, LessonType.QUIZ, LessonType.VIDEO]

export default Factory.define(Lesson, ({ faker }) => {
  return {
    title: faker.lorem.sentence(4),
    details: faker.lorem.text(),
    content: faker.lorem.text(),
    videoUrl: faker.internet.url(),
    type: lessonTypes[Math.floor(Math.random() * lessonTypes.length)],
    publishedAt: null,
  }
})
  .state(
    'published',
    (lesson, { faker }) => (lesson.publishedAt = DateTime.fromJSDate(faker.date.past()))
  )
  .relation('section', () => SectionFactory)
  .build()
