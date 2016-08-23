'use strict'

const rooms = require('../../data/rooms.json')
const Room = use('App/Model/Room')
const moment = require('moment')

class RoomSeeder {

  * run () {

    let modRooms = rooms.map( room => {
      
      if (typeof room.date === 'object') {
        room.date = moment(room.date['$date']).format('MMMM, Do YYYY')
      }

      return {
        roomID: room.roomID,
        name: room.name,
        date: room.date,
        class: room.class,
        desc: room.desc
      };

    })

    yield Room.createMany(modRooms)
  }

}

module.exports = RoomSeeder
