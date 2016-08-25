'use strict'

const Lucid = use('Lucid')

class Event extends Lucid {

  guests () {
    return this.hasMany('App/Model/Guest')
  }

}

module.exports = Event
