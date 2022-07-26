/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| User registration, login, & social accounts connection.
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => [Route.post('/', 'Community/CreateCommunityController.handler')])
  .prefix('communities')
  .middleware('auth')
