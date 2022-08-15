/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| User registration, login, & social accounts connection.
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Bull from '@ioc:Rocketseat/Bull'
import UpdateResumeNft from 'App/Jobs/Learning/UpdateResumeNft'
import Address from 'App/Models/Profile/Address'

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

  Route.get('test', async () => {
    const address = await Address.query()
      .where('publicKey', '8YVimjvVhNFSXQNEhe9kra9vQNG7nwTqqBVWPjYYFxN7')
      .firstOrFail()

    await Bull.add(new UpdateResumeNft().key, { user: address.userId })

    return { address }
  }),

  Route.post('/certifiers', 'Learning/CertifiersController.store'),

  Route.get('/courses/:course', 'Learning/CourseController.show'),
]).prefix('learning')
