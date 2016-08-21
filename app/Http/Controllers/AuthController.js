'use strict'

const User = use('App/Model/User')

class AuthController {


  * verify (request, response) {
    response.json({ authed: true })
  }

  * url (request, response) {
    response.json({ url: request.googleURL })
  }

  * callback (request, response) {

    const profile = request.googleProfile;

    // Are they logged in & is it a TIY Email
    if (profile && this.validateTIY(profile)) {

      let user = yield this.createUser(profile);
      let token = yield request.auth.generate(user);

      // Dirty... super dirty
      response.redirect('/#/admin?a=' + token);

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

    return User.findOrCreate({ 'googleId': profile.id }, user);
  }

}

module.exports = AuthController
