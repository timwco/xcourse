'use strict'

const Room = use('App/Model/Room')
const Guest = use('App/Model/Guest')
const Database = use('Database')

const MarkdownIt  = require('markdown-it')
const md          = new MarkdownIt()
const json2csv    = require('json2csv')

class RoomController {

  * index (request, response) {
    const rooms = yield Room.all();
    console.log(request.currentUser);
    yield response.sendView('rooms', { rooms: rooms });
  }

  * store (request, response) {

    const input = request.all();

    let room = {
      name   : input.class + '-' + input.date,
      date   : input.date,
      class  : input.class,
      desc   : input.description
    }
    room = yield Room.create(room);

    return response.redirect(`/rooms/${room.id}`);
  }

  * show (request, response) {
    
    const room = yield Room.findBy('id', request.param('id'));

    if (room) {
      room.desc = md.render(room.desc);
      yield response.sendView('room', { room });
    } else {
      return response.json({ noRoom: true })
    }   
  }

  * update (request, response) {

  }

  * export (request, response) {

    const roomId = request.param('id');
    const guests = yield Guest.query().where('roomId', roomId).fetch();

    let fields = ['name', 'date', 'class', 'email'];
    if (guests.value().length < 1) { return response.redirect('/#/admin?c=2') }
    let allGuests = guests.value().map( guest => guest.attributes)

    json2csv({ data: allGuests, fields: fields }, function (err, csv) {
      if (err) console.log(err);
      response.header('Content-disposition', 'attachment; filename='+ `room-${roomId}-export.csv`);
      response.send(csv);
    })

  }

}

module.exports = RoomController
