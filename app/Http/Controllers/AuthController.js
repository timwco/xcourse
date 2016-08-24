'use strict'

const User = use('App/Model/User')

class AuthController {


  * verify (request, response) {
    response.json({ authed: true })
  }

  * login (request, response) {
    yield response.sendView('login', { url: request.googleURL });
  }

  * logout (request, response) {
    yield request.auth.logout()
    return response.redirect('/');
  }

  * callback (request, response) {

    const profile = request.googleProfile;

    // Are they logged in & is it a TIY Email
    if (profile && this.validateTIY(profile)) {

      let user = yield this.createUser(profile);
      yield request.auth.login(user)

      response.redirect('/?yay');

    } else { response.redirect('/?boooo'); }
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
