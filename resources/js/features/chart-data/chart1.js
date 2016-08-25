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
      labels: _.map(this.courses, course => this.classMap(course)),
      datasets: [{ data: count }]
    }
  }

  classMap (abrv) {
    let className = abrv;
    switch (abrv) {
      case 'rb':
        className = 'Ruby';
      break;
      case 'js':
        className = 'JavaScript';
      break;
      case 'de':
        className = 'Design';
      break;
      case 'ios':
        className = 'iOS';
      break;
      case 'java':
        className = 'Java';
      break;
      case 'net':
        className = '.NET';
      break;
      default:
        className = abrv;
      break;
    }

    return className;
  }

}

export default Chart1;