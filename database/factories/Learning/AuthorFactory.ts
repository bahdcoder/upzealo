import Author from 'App/Models/Learning/Author'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CourseFactory from 'Database/factories/Learning/CourseFactory'

export default Factory.define(Author, ({ faker }) => {
  return {
    bio: faker.lorem.text(),
  }
})
  .relation('courses', () => CourseFactory)
  .build()
