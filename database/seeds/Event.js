'use strict'

const events = require('../../data/events.json')
const Event = use('App/Model/Event')
const moment = require('moment')

class EventSeeder {

  * run () {

    let modEvents = events.map( event => {
      
      if (typeof event.date === 'object') {
        event.date = moment(event.date['$date']).format('MMMM Do YYYY')
      }

      return {
        name: event.name,
        date: event.date,
        class: event.class,
        desc: event.desc
      };

    })

    yield Event.createMany(modEvents)
  }

}

module.exports = EventSeeder
