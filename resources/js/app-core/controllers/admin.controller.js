import Pikaday from 'pikaday';

let AdminController = function(RoomService, AuthService, $stateParams, $state) {

  let vm = this;

  vm.createRoom = createRoom;
  vm.deleteRoom = deleteRoom;
  vm.alert = false;
  vm.noData = false;
  vm.onClickTab = onClickTab;

  vm.tabs = [
    { title: 'Event Data', url: 'templates/tab-admin.tpl.html' },
    { title: 'Create an Event', url: 'templates/tab-new.tpl.html' }
  ];

  vm.tabContent = vm.tabs[0].url;

  vm.isActiveTab = function(tabUrl) {
    return tabUrl == vm.tabContent;
  }

  activate();

  // Verify User Logged in
  function activate() {

    if ($stateParams.c === '1') { vm.alert = true;}
    if ($stateParams.c === '2') { vm.noData = true; }

    AuthService.verify().then( (res) => {
      vm.authed = res.data.authed;
      if (vm.authed) {
        new Pikaday({
          field: document.getElementById('datepicker'),
          format: 'MMM D, YYYY',
          position: 'bottom left'
        });
      }
    });

    // Load Rooms
    loadRooms();

  }

  function onClickTab (tab) {
    vm.tabContent = tab.url;
  } 

  function loadRooms () {
    RoomService.getRooms().then( (res) => {
      vm.rooms = res.data.reverse();
    });
  }

  function createRoom (data) {
    RoomService.create(data).then( (res) => {
      $state.go('root.singleRoom', { id: res.data.roomID });
    });
  }

  function deleteRoom (id) {
    if (window.confirm("Are you sure? There is NO going back!")) {
      RoomService.destroy(id).then( (res) => {
        loadRooms();
      });
    }
  }


};

AdminController.$inject = ['RoomService', 'AuthService', '$stateParams', '$state'];
export default AdminController;
