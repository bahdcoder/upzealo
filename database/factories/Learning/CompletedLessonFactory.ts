import Factory from '@ioc:Adonis/Lucid/Factory'
import CompletedLesson from 'App/Models/Learning/CompletedLesson'

import UserFactory from 'Database/factories/Profile/UserFactory'
import LessonFactory from 'Database/factories/Learning/LessonFactory'
import CourseFactory from 'Database/factories/Learning/CourseFactory'

export default Factory.define(CompletedLesson, () => {
  return {}
})
  .relation('lesson', () => LessonFactory)
  .relation('user', () => UserFactory)
  .relation('course', () => CourseFactory)
  .build()
