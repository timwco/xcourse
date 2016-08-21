'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

// Main Route - Loads AngularJS Main Page
Route.on('/').render('main')

// Auth Routes
Route.group('auth', () => {
  Route.get('/verify', 'AuthController.verify')
  Route.get('/url', 'AuthController.url').middleware('googleURL')
  Route.get('/google/callback', 'AuthController.callback').middleware('googleLogin')
}).prefix('/auth')


// Room Routes
Route.group('rooms', () => {
  Route.get('/', 'RoomController.index')
  Route.post('/', 'RoomController.store')
  Route.get('/:id', 'RoomController.show')
  Route.put('/:id', 'RouteController.update')
  Route.get('/export/:id', 'RouteController.export')
}).prefix('/room')


// Guest Routes
Route.post('/register', 'GuestController.store')