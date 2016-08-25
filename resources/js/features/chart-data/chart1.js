import _ from 'lodash'

class Chart1 {

  constructor () {
    this.courses = _(bsStats.events).map('class').uniq().value();
    this.guests  = bsStats.guests;
  }

  data () {
    let count = _.map(this.courses, course => {
      return this.guests.filter( guest => {
        return guest.class === course;
      }).length
    })


    return {
      labels: _.map(this.courses, course => course.toUpperCase()),
      datasets: [{ data: count }]
    }
  }

}

export default Chart1;