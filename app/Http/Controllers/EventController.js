'use strict'

const Event = use('App/Model/Event')
const Guest = use('App/Model/Guest')
const Database = use('Database')

const MarkdownIt  = require('markdown-it')
const md          = new MarkdownIt()
const json2csv    = require('json2csv')
const _           = require('lodash')

class EventController {

  * index (request, response) {
    let events = yield Event.all();
    events = _.reverse(events.value())
    yield response.sendView('events', { events });
  }

  * store (request, response) {

    const input = request.all();

    let event = {
      name   : input.class + '-' + input.date,
      date   : input.date,
      class  : input.class,
      desc   : input.description
    }
    event = yield Event.create(event);

    return response.redirect(`/events/${event.id}`);
  }

  * show (request, response) {
    
    const event = yield Event.findBy('id', request.param('id'));

    if (event) {
      event.desc = md.render(event.desc);
      yield response.sendView('event', { event });
    } else {
      return response.json({ noEvent: true })
    }   
  }

  * update (request, response) {

  }

  * destroy (request, response) {
    const event = yield Event.findBy('id', request.param('id'));
    yield event.delete();
    response.redirect('/events')
  }

  * export (request, response) {

    const eventId = request.param('id');
    const guests = yield Guest.query().where('eventId', eventId).fetch();

    let fields = ['name', 'date', 'class', 'email'];
    if (guests.value().length < 1) { 
      return response.send('Sorry, no guests to export for that event.'); 
    }
    let allGuests = guests.value().map( guest => guest.attributes)

    json2csv({ data: allGuests, fields: fields }, function (err, csv) {
      if (err) console.log(err);
      response.header('Content-disposition', 'attachment; filename='+ `event-${eventId}-export.csv`);
      response.send(csv);
    })

  }

}

module.exports = EventController
