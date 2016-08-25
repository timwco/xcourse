'use strict'

const guests = require('../../data/guests.json')
const Guest = use('App/Model/Guest')
const moment = require('moment')

class GuestSeeder {

  * run () {
    let modGuests = guests.map( guest => {

      if (typeof guest.date === 'object') {
        guest.date = moment(guest.date['$date']).format('MMMM, Do YYYY')
      }

      return {
        name: guest.name,
        email: guest.email,
        class: guest.class,
        eventId: guest.roomID,
        date: guest.date
      }
    })
    yield Guest.createMany(modGuests)
  }

}
module.exports = GuestSeeder