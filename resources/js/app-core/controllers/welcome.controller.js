let WelcomeController = function($http, RoomService, $state, $cookies, $stateParams) {

  let vm = this;

  vm.register = register;
  vm.showUnregister = false;
  vm.noRoom = false;
  vm.showRoomAccess = false;

  activate();

  function activate() {
    let code = $stateParams.c;
    if (code === 'unregistered') {
      let room = $cookies.get('tiy_cc_reg');
      if (room) {
        vm.showRoomAccess = true;
        vm.roomAccessible = room;
      } else {
        vm.showUnregister = true;
      }
    } else if (code === 'noroom') {
      vm.noRoom = true;
    }
  }

  function register(info, roomId) {

    RoomService.get(roomId).then( (res) => {

      info.class = res.data.class;
      info.date  = res.data.date;
      info.roomId = res.data.id;

      $http.post('/register', info).then( (res) => {
        $cookies.put('tiy_cc_reg', roomId);
        $state.go('root.singleRoom', { id: roomId });
      });

    });


  }

};

WelcomeController.$inject = ['$http', 'RoomService', '$state', '$cookies', '$stateParams'];
export default WelcomeController;
