import Path from 'App/Models/Learning/Path'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CourseFactory from 'Database/factories/Learning/CourseFactory'

export default Factory.define(Path, ({ faker }) => {
  return {
    title: faker.lorem.sentence(4),
    details: faker.lorem.text(),
    coverImage: faker.image.imageUrl(),
  }
})
  .relation('courses', () => CourseFactory)
  .build()
