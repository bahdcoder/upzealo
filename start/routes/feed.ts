/*
|--------------------------------------------------------------------------
| Feed Routes
|--------------------------------------------------------------------------
|
| Create posts, comments, reactions, etc.
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => [
  Route.post('/posts', 'Feed/PostController.store'),
  Route.get('/posts/:post', 'Feed/PostController.show'),
  Route.post('/attachments', 'Feed/AttachmentController.store'),
  Route.post('/follows/:user', 'Feed/FollowController.store'),
  Route.delete('/follows/:user', 'Feed/FollowController.destroy'),

  Route.get('/', 'Feed/FeedController.timeline'),
  Route.get('/:user', 'Feed/FeedController.profile'),
])
  .prefix('feed')
  .middleware('auth')
