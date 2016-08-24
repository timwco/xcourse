import angular from 'angular';
import 'angularfire';
import Autolinker from 'autolinker';

angular
  .module('app', ['firebase'])
  .filter('linkify', linkifyFilter)
  .controller('FirebaseController', FirebaseController)
  .service('FireChat', FireChat)
;

// Firebase Controller
function FirebaseController (FireChat, $location) {

  let vm = this;
  let chat = [];

  init();

  function init () {
    // Get Room ID from URL
    let url = window.location.href;
    let id  = url.substr(url.lastIndexOf('/') + 1);
    
    // Initialize the Firebase Chat Array/Obj
    chat = FireChat.createChat(`room-${id}`);
    vm.messages = FireChat.getMessages(chat);
  }

  vm.addMessage = (message)  => {
    FireChat.addMessage(vm.messages, message).then( (res) => {
      vm.message = '';
    });
  }

  vm.deleteMessage= (message) => {
    FireChat.delete(vm.messages, message);
  }
}

// Firebase Service
function FireChat ($firebaseObject, $firebaseArray) {

  let ArrayHTML = $firebaseArray.$extend({
    linkified: function () {
      let messages = [];
      angular.forEach(this.$list, function(rec) {
        messages.push({ html: rec.$value, id: rec.$id });
      });
      return messages;
    }
  });

  this.createChat = name => new Firebase('https://crashcoursechat.firebaseio.com/rooms/' + name + '/messages');
  this.getMessages = ref => new ArrayHTML(ref);
  this.addMessage = (ref, message) => ref.$add(message);
  this.delete = (ref, message) => ref.$remove(message);
}




function linkifyFilter ($sce) {
  return function (input) {
    return $sce.trustAsHtml(Autolinker.link(input));
  };
};

linkifyFilter.$inject = ['$sce'];
export default linkifyFilter;