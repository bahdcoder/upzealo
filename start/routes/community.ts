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
  Route.get('/', 'Community/CommunityController.index'),
  Route.get('/self', 'Community/CommunityController.self'),
  Route.post('/', 'Community/CreateCommunityController.handler'),
  Route.get('/:community/memberships', 'Community/MembershipController.index').middleware(
    'membership'
  ),
  Route.post('/:community/memberships', 'Community/RequestToJoinCommunityController.handler'),
])
  .prefix('communities')
  .middleware('auth')
