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

  Route.post('/course/:course/enroll', 'Learning/EnrolmentController.store'),
])
  .prefix('learning')
  .middleware('auth')

Route.group(() => [
  Route.get('/courses', 'Learning/CourseController.index'),
  Route.get('/courses/:course', 'Learning/CourseController.show'),
]).prefix('learning')
