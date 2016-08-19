'use strict'

const Lucid = use('Lucid')

class Room extends Lucid {

  guests () {
    return this.hasMany('App/Model/Guest')
  }

}

module.exports = Room
