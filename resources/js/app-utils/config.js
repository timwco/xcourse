let config = function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('root', {
      abstract: true,
      templateUrl: 'templates/layout.tpl.html'
    })

    // Admin
    .state('root.admin', {
      url: '/admin?c',
      controller: 'AdminController as vm',
      templateUrl: 'templates/admin.tpl.html'
    })

    // Admins
    .state('root.create', {
      url: '/create',
      controller: 'CreateRoomController as vm',
      templateUrl: 'templates/create.tpl.html'
    })

    // Guests
    .state('root.welcome', {
      url: '/?c',
      controller: 'WelcomeController as vm',
      templateUrl: 'templates/welcome.tpl.html'
    })

    // Room
    .state('root.singleRoom', {
      url: '/room/:id',
      controller: 'RoomController as vm',
      templateUrl: 'templates/room.tpl.html'
    })
  ;

  $urlRouterProvider.otherwise('/');


};

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default config;
