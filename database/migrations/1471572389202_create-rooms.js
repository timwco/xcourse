'use strict'

const Schema = use('Schema')

class CreateRoomsSchema extends Schema {

  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string('name')
      table.string('class')
      table.integer('roomID')
      tbale.text('desc')
      table.string('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }

}

module.exports = CreateRoomsSchema
