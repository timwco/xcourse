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
    let date = moment().format('MMMM Do YYYY');
    // Get all the input data, add date, eventId and class
    let guest = request.all();
    let event = guest.event.split('-');
    delete guest.event;
    guest.date = date;
    guest.eventId = event[0]
    guest.class = event[1]

    // Create the guest and respond with the new guest object
    yield Guest.create(guest);
    response.route('event', {id: guest.eventId })
  }

  * welcome (request, response) {
    let today = moment().format('MMMM Do YYYY')
    // let today = 'February 16th 2016';
    let events = yield Event.query().where('date', today)
    yield response.sendView('general/welcome', { events })
  }

}

module.exports = GuestController