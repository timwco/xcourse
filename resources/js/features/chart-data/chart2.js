import _ from 'lodash'

let guests = [];

bsStats.guests.forEach( guest => {
  let specialGuest = _.find(guests, {email: guest.email});
  if (specialGuest) {
    specialGuest.count ++;
  } else {
    guest.count = 1;
    guests.push(guest);
  }
});

guests = _(guests).orderBy('count').reverse().value();


function topHTML (guests) {
  let html = '';
  guests.forEach( guest => {
    let name = guest.name.replace(/\b[a-z]/g, fl => fl.toUpperCase());
    html += `<li><a href="/guest/${guest.id}">(${guest.count}) ${name}</a></li>`;
  })
  return html;
}

export default {
  uniqueGuests: guests.length,
  topGuests: topHTML(_.take(guests, 3))
}