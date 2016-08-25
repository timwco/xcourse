'use strict'

const Schema = use('Schema')

class CreateEventsSchema extends Schema {

  up () {
    this.create('events', (table) => {
      table.increments()
      table.string('name')
      table.string('class')
      table.text('desc')
      table.string('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }

}

module.exports = CreateEventsSchema
