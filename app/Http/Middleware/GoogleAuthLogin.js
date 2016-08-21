'use strict'

const Env = use('Env')

const google = require('googleapis')
const thunkify = require('thunkify')
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

    // Connect to Google & get our token
    const oauthToken = thunkify(oauth2Client.getToken.bind(oauth2Client))
    const tokens = yield oauthToken(query.code)
    oauth2Client.setCredentials(tokens[0]);

    // Connect to Google to get user info
    const googlePlus = thunkify(plus.people.get)
    const profile = yield googlePlus({ userId: 'me', auth: oauth2Client })
    
    request.googleProfile = profile[0]

    yield next;

  }

}

module.exports = GoogleAuthLogin
