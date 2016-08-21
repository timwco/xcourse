'use strict'

const Guest = use('App/Model/Guest')

const moment = require('moment');

class GuestController {

  * store (request, response) {
    // Generate a Pretty Date
    let date = moment(new Date()).format('MMMM, Do YYYY');
    // Get all the input data, add date
    let input = request.all();
    input.date = date;
    // Create the guest and respond with the new guest object
    let guest = yield Guest.create(input);
    response.json(guest.toJSON());
  }

}

module.exports = GuestController
