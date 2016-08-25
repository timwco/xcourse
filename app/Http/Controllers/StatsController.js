'use strict' 

const Guest = use('App/Model/Guest')
const Event  = use('App/Model/Event')

class StatsController {

  * index (request, response) {

    const guests = yield Guest.all();
    const events  = yield Event.all();

    yield response.sendView('general/stats', { guests: guests.value(), events: events.value()});
  }

}

module.exports = StatsController
