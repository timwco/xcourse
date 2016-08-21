'use strict'

class AuthController {


  * verify (request, response) {
    response.json({ authed: true })
  }

  * url (request, response) {
    response.json({ url: request.googleURL })
  }

  * callback (request, response) {
    response.json({ stuff: 'yeah' })
  }

}

module.exports = AuthController
