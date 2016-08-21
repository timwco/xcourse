'use strict'

const Env = use('Env')
const User = use('App/Model/User')

const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const config = {}

if (Env.get('NODE_ENV') === 'development') {
  config.callback = 'http://localhost:3333/auth/google/callback';
} else {
  config.callback = 'https://xcourse.co/auth/google/callback';
}

class Passport {

  * handle (request, response, next) {

    const oauth2Client = new OAuth2(
      Env.get('GOOGLE_CLIENT_ID'), 
      Env.get('GOOGLE_SECRET'), 
      config.callback
    );

    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const url = yield oauth2Client.generateAuthUrl({
      access_type: 'online', // 'online' (default) or 'offline' (gets refresh_token)
      scope: scopes // If you only need one scope you can pass it as string
    });

    console.log(url);

    yield next
  }

}

module.exports = Passport
