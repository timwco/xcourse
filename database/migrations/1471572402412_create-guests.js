'use strict'

const Schema = use('Schema')

class CreateGuestsSchema extends Schema {

  up () {
    this.create('guests', (table) => {
      table.increments()
      table.string('name')
      table.integer('roomID')
      table.string('email')
      table.string('class')
      table.string('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('guests')
  }

}

module.exports = CreateGuestsSchema
