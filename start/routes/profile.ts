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

  Route.get('/onboarding', 'Profile/OnboardingController.index'),
])
  .middleware('auth')
  .prefix('profiles')
