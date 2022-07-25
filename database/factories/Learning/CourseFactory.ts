import { DateTime } from 'luxon'
import Course from 'App/Models/Learning/Course'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PathFactory from 'Database/factories/Learning/PathFactory'
import AuthorFactory from 'Database/factories/Learning/AuthorFactory'
import SectionFactory from 'Database/factories/Learning/SectionFactory'

export default Factory.define(Course, ({ faker }) => {
  return {
    title: faker.lorem.sentence(4),
    details: faker.lorem.text(),
    coverImage: faker.image.imageUrl(),
    publishedAt: null,
  }
})
  .state(
    'published',
    (course, { faker }) => (course.publishedAt = DateTime.fromJSDate(faker.date.past()))
  )
  .relation('author', () => AuthorFactory)
  .relation('path', () => PathFactory)
  .relation('sections', () => SectionFactory)
  .build()
