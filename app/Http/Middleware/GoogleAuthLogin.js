'use strict'

const Env = use('Env')

const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const plus = google.plus('v1')
const config = {}

if (Env.get('NODE_ENV') === 'development') {
  config.callback = 'http://localhost:3333/auth/google/callback';
} else {
  config.callback = 'https://xcourse.co/auth/google/callback';
}

class GoogleAuthLogin {

  * handle (request, response, next) {
    
    // Initiate Oauth Connection
    const oauth2Client = new OAuth2(
      Env.get('GOOGLE_CLIENT_ID'), 
      Env.get('GOOGLE_SECRET'), 
      config.callback
    );

    // Get the code from the callback response
    const query = request.get();

    // The callback to run once we have a token
    let callback = (err, tokens) => {
      if(!err) {
        oauth2Client.setCredentials(tokens);
        plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
          if (err) {
            return request.google_profile = err;
          }
          return request.google_profile = profile;
        });
      }
    }

    // Connect to Google & get our token
    oauth2Client.getToken(query.code, callback);

    yield next
  }

}

module.exports = GoogleAuthLogin
