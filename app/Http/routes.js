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

// Welcome / Home Page Routes
Route.on('/').render('welcome')

// Auth Routes
Route.group('auth', () => {
  Route.get('/login', 'AuthController.login').middleware('googleURL')
  Route.get('/logout', 'AuthController.logout')
  Route.get('/google/callback', 'AuthController.callback').middleware('googleLogin')
}).prefix('/auth')

// Room Routes
Route.group('rooms', () => {
  Route.get('/:id', 'RoomController.show')
  Route.get('/', 'RoomController.index').middleware('auth')
  Route.get('/new').render('rooms-new').middleware('auth')
  Route.post('/new', 'RoomController.store').middleware('auth')
  Route.get('/export/:id', 'RoomController.export').middleware('auth')
  Route.get('/delete/:id', 'RoomController.destroy').middleware('auth')
}).prefix('/rooms')

// Guest Routes
Route.post('/register', 'GuestController.store')