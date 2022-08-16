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
  Route.post('/bounties', 'Feed/BountyController.store'),
  Route.put('/bounties/:bounty', 'Feed/BountyController.update'),
  Route.post('/bounties/transaction', 'Feed/BountyController.transaction'), // Get the create bounty transaction. Will be signed and returned back to POST /bounties endpoint for sending to blockchain.

  Route.get('/posts/:post', 'Feed/PostController.show'),
  Route.post('/attachments', 'Feed/AttachmentController.store'),
  Route.post('/follows/:user', 'Feed/FollowController.store'),
  Route.delete('/follows/:user', 'Feed/FollowController.destroy'),

  // comments
  Route.get('/posts/:post/comments', 'Feed/CommentController.index'),
  Route.post('/posts/:post/comments', 'Feed/CommentController.store'),
  Route.post('/posts/:post/comments/:comment', 'Feed/CommentController.store'),

  Route.get('/', 'Feed/FeedController.timeline'),
  Route.get('/:user', 'Feed/FeedController.profile'),
])
  .prefix('feed')
  .middleware('auth')
