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
  Route.post('/join', 'Auth/JoinController.handler'),
  Route.post('/login', 'Auth/LoginController.handler'),
  Route.get('/:publicKey/check', 'Auth/CheckUserExistsController.handler'),
  Route.post('/:network/callback', 'Auth/SocialAccountsController.handler'),
]).prefix('auth')

Route.group(() => [
  Route.get('/me', 'Auth/ProfileController.handler'),
  Route.get('/:username/check', 'Auth/CheckUsernameExistsController.handler'),
])
  .middleware('auth')
  .prefix('auth')
