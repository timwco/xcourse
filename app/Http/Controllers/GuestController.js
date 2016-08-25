'use strict'

const Guest = use('App/Model/Guest')
const Event = use('App/Model/Event')

const moment = require('moment');

class GuestController {

  * index (request, response) {
    let guests = yield Guest.all()
    guests = guests.uniqBy('email')
    yield response.sendView('guests/guests', { guests: guests.toJSON() })
  }

  * show (request, response) {
    const guest = yield Guest.findBy('id', request.param('id'));
    const guests = yield Guest.all()
    let events = guests.filter({ email: guest.email }).value();

    yield response.sendView('guests/guest', { guest, events });
  }

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
