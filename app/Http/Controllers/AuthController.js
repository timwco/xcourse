'use strict'

class AuthController {


  * verify (request, response) {
    response.json({ authed: true })
  }

  * url (request, response) {
    response.json({ url: request.googleURL })
  }

  * callback (request, response) {
    
    if (request.google_profile) {
      response.redirect('/#/admin');
    } else {
      response.redirect('/#/admin?c=1');
    }

  }

}

module.exports = AuthController
