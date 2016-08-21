'use strict'

const User = use('App/Model/User')

class AuthController {


  * verify (request, response) {
    response.json({ authed: false })
  }

  * url (request, response) {
    response.json({ url: request.googleURL })
  }

  * callback (request, response) {

    const profile = request.googleProfile;

    // Are they logged in & is it a TIY Email
    if (profile && this.validateTIY(profile)) {

      // Check for existing User
      let user = yield User.findBy('googleId', profile.id)

      if (user) {
        response.redirect('/#/admin');
      } else {
        // No existing user, create one in the DB
        yield this.createUser(profile);
        response.redirect('/#/admin');
      }

    } else { response.redirect('/#/admin?c=1') }
  }

  validateTIY (profile) {
    return profile.domain === 'theironyard.com';
  }

  createUser (profile) {
    let user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      authProvider: 'Google',
      googleId: profile.id
    }

    return User.create(user);
  }

}

module.exports = AuthController
