'use strict'

const Schema = use('Schema')

class CreateUsersSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name')
      table.string('email').unique().notNullable()
      table.string('authProvider')
      table.string('googleId').unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = CreateUsersSchema
