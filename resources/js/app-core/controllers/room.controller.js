let RoomController = function(AuthService, RoomService, FireChat, $stateParams, $sce, $cookies, $state) {

  let vm = this;

  let chat = [];

  vm.addMessage = addMessage;
  vm.authed = false;
  vm.deleteMessage = deleteMessage;

  activate();

  function activate() {

    let token = $cookies.get('token');

    if (token) {
      AuthService.verify().then( (res) => {
        vm.authed = res.data.authed;
        if (!vm.authed) { checkRegistration($stateParams.id); }
      });
    }

    RoomService.get($stateParams.id).then( (res) => {

      if (res.data.noRoom) { $state.go('root.welcome', { c: 'noroom' }); }

      // Set Room Description & Details
      vm.date = res.data.date;
      vm.description = $sce.trustAsHtml(res.data.desc);

      // Create Chat Connection
      chat = FireChat.createChat('room-' + res.data.id);
      vm.messages = FireChat.getMessages(chat);

      // Set Room Title
      vm.title = res.data.class;

    });
  }

  function checkRegistration(id) {
    let reg = $cookies.get('tiy_cc_reg');
    if (reg !== id) {
      $state.go('root.welcome', { c: 'unregistered' });
    }
  }

  function addMessage(message) {
    FireChat.addMessage(vm.messages, message).then( (res) => {
      vm.message = '';
    });
  }

  function deleteMessage(message) {
    console.log(message);
    FireChat.delete(vm.messages, message);
  }

};

RoomController.$inject = ['AuthService', 'RoomService', 'FireChat', '$stateParams', '$sce', '$cookies', '$state'];
export default RoomController;
