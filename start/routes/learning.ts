/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| User registration, login, & social accounts connection.
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => [
  Route.get('/courses/:course/progress', 'Learning/CourseProgressController.index'),
  Route.post('/courses/:course/lessons/:lesson', 'Learning/CourseProgressController.store'),

  Route.post('/courses/:course/enroll', 'Learning/EnrolmentController.store'),

  Route.get('/courses/badges/personalised', 'Learning/CourseController.badges'),
])
  .prefix('learning')
  .middleware('auth')

Route.group(() => [
  Route.get('/courses/badges', 'Learning/CourseController.badges'),
  Route.get('/courses', 'Learning/CourseController.index'),

  Route.get('/courses/:course', 'Learning/CourseController.show'),
]).prefix('learning')
