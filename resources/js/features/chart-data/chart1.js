import _ from 'lodash'

let courses = _(bsStats.rooms).map('class').uniq().value();

let count = _.map(courses, course => {
  return bsStats.guests.filter( guest => {
    return guest.class === course;
  }).length
})


let data = {
  labels: _.map(courses, course => course.toUpperCase()),
  datasets: [{ data: count }]
}

export default data;