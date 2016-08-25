'use strict' 

const Guest = use('App/Model/Guest')
const Room  = use('App/Model/Room')

class StatsController {

  * index (request, response) {

    const guests = yield Guest.all();
    const rooms  = yield Room.all();

    yield response.sendView('stats', { guests: guests.value(), rooms: rooms.value()});
  }

}

module.exports = StatsController
