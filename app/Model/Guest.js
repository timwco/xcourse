'use strict'

const Lucid = use('Lucid')

class Guest extends Lucid {

  event () {
    return this.belongsTo('App/Model/Event')
  }

}

module.exports = Guest
