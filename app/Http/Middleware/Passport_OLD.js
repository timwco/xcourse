'use strict'

const Env = use('Env')
const User = use('App/Model/User')

const thunkify = require('thunkify')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcrypt')
const config = {};

if (Env.get('NODE_ENV') === 'development') {
  config.callback = 'http://localhost:3333/auth/google/callback';
} else {
  config.callback = 'https://xcourse.co/auth/google/callback';
}


class Passport {

  * handle (request, response, next) {

    console.log('HERE ---------------------------- 1');

    // passport.use(
    //   new GoogleStrategy({
    //     clientID: Env.get('GOOGLE_CLIENT_ID'),
    //     clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
    //     callbackURL: config.callback
    //   },
    //   function (accessToken, refreshToken, profile, done) {
    //     console.log('HERE ---------------------------- 2');

    //     const user = new User();
    //       user.name = profile.displayName
    //       user.email = profile.emails[0].value
    //       user.authProvider = 'Google'
    //       user.googleId = profile.id

    //     user.save();

    //     done(err, user);
    //   }
    // ));

    let verify = (accessToken, refreshToken, profile, done) => {
      console.log('HERE ---------------------------- 2');

      const user = new User();
        user.name = profile.displayName
        user.email = profile.emails[0].value
        user.authProvider = 'Google'
        user.googleId = profile.id

      user.save();

      done(err, user);
    }

    // let auth = passport.use(new GoogleStrategy({
    //   clientID: Env.get('GOOGLE_CLIENT_ID'),
    //   clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
    //   callbackURL: config.callback
    // }, verify ));

    // console.log('HERE ---------------------------- 3');


    // ------
    let pp = thunkify(passport.use);

    try {
      console.log(pp);
      yield pp(new GoogleStrategy({
        clientID: Env.get('GOOGLE_CLIENT_ID'),
        clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
        callbackURL: config.callback
      }, verify));
    } catch (e) {
      console.log('hereerewerwer werere');
      console.log(e);
    }

    yield next
  }

}

module.exports = Passport
