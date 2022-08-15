import Author from 'App/Models/Learning/Author'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from 'Database/factories/Profile/UserFactory'
import CourseFactory from 'Database/factories/Learning/CourseFactory'

export default Factory.define(Author, ({ faker }) => {
  return {
    bio: faker.lorem.text(),
  }
})
  .relation('courses', () => CourseFactory)
  .relation('user', () => UserFactory)
  .build()
