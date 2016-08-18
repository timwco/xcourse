let FireChat = function($firebaseObject, $firebaseArray) {

  let ArrayHTML = $firebaseArray.$extend({
    linkified: function () {
      var messages = [];
      angular.forEach(this.$list, function(rec) {
        messages.push({ html: rec.$value, id: rec.$id });
      });
      return messages;
    }
  });

  this.createChat = (name) => new Firebase('https://crashcoursechat.firebaseio.com/rooms/' + name + '/messages');

  this.getMessages = (ref) => new ArrayHTML(ref);

  this.addMessage = (ref, message) => ref.$add(message);

  this.delete = (ref, message) => ref.$remove(message);

};

FireChat.$inject = ['$firebaseObject', '$firebaseArray'];
export default FireChat;
