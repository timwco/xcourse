'use strict'

const Env = use('Env')

const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const config = {}

if (Env.get('NODE_ENV') === 'development') {
  config.callback = 'http://localhost:3333/auth/google/callback';
} else {
  config.callback = 'https://xcourse.co/auth/google/callback';
}

class GoogleAuthUrl {

  * handle (request, response, next) {

    // Initiate Oauth Connection
    const oauth2Client = new OAuth2(
      Env.get('GOOGLE_CLIENT_ID'), 
      Env.get('GOOGLE_SECRET'), 
      config.callback
    );

    // Set our Scopes
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    // Build the URL
    const url = oauth2Client.generateAuthUrl({
      access_type: 'online',
      scope: scopes
    });

    // Attach the URL to the request
    request.googleURL = url;

    yield next
  }

}

module.exports = GoogleAuthUrl
