'use strict'

const passport = require('passport');

class AuthController {


  * verify (request, response) {
    response.json({ authed: true })
  }

  * url (request, response) {
    response.json({ url: request.googleURL })
  }

  * google (request, response) {
    // Send info to Google
    passport.authenticate('google', { scope: ['profile', 'email'] })(request, response);
  }

  * callback (request, response) {
    // Callback to be run if you can login via Google
    passport.authenticate('google', (err, user, info) => {
      // If any errors...
      if (err) return response.redirect('/#/admin?c=1');

      request.logIn(user, function(err) {
        if (err) return response.redirect('/#/admin?c=1');
      });
      // Successfully show user is logged in
      return response.redirect('/#/admin');
    })(request, response);
  }

}

module.exports = AuthController
