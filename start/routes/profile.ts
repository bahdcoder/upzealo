/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| User registration, login, & social accounts connection.
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => []).prefix('profiles')

Route.group(() => [
  Route.get('/badges', 'Profile/BadgeController.index'),
  Route.put('/username/update', 'Profile/UpdateUsernameController.update'),
  Route.put('/bio/update', 'Profile/UpdateBioController.update'),

  // Attach badges to a user profile.
  Route.post('/badges', 'Profile/BadgeController.store'),
  Route.post('/tags', 'Profile/TagController.store'),

  // Suggestions
  Route.get('/follows/suggestions', 'Profile/FollowSuggestionController.index'),
  Route.get('/wallets/balances', 'Profile/WalletController.index'),
])
  .middleware('auth')
  .prefix('profiles')
