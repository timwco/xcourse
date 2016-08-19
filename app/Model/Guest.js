'use strict'

const Lucid = use('Lucid')

class Guest extends Lucid {

  room () {
    return this.belongsTo('App/Model/Room')
  }

}

module.exports = Guest
