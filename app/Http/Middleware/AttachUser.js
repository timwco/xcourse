'use strict';

const View = use('View')

class AttachUser {

  * handle (request, response, next) {
    View.global('me', request.currentUser)
    yield next
  }

}

module.exports = AttachUser