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
])
  .prefix('feed')
  .middleware('auth')
