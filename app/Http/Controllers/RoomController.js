'use strict'

const Room = use('App/Model/Room')
const Database = use('Database')

const MarkdownIt  = require('markdown-it')
const md          = new MarkdownIt()
const json2csv    = require('json2csv')
const fs          = require('fs')

class RoomController {

  * index (request, response) {
    const rooms = yield Room.all();
    return response.json(rooms);
  }

  * store (request, response) {

    const input = request.all();
    const count = yield Database.from('rooms').count('id as id')

    let room = {
      roomID : count[0].id + 1,
      name   : input.class + '-' + input.date,
      date   : input.date,
      class  : input.class,
      desc   : input.description
    }
    room = yield Room.create(room);

    return response.json(room);
  }

  * show (request, response) {
    
    const room = yield Room.findBy('id', request.param('id'));

    if (room) {
      room.desc = md.render(room.desc);
      return response.json(room);
    } else {
      return response.json({ noRoom: true })
    }   
  }

  * update (request, response) {

  }

  * export (request, response) {
    
  }

}

module.exports = RoomController
