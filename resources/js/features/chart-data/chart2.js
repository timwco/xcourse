import _ from 'lodash'

class Chart2 {

  constructor () {
    this.guests = [];
    this.originalGuests = bsStats.guests;
  }

  data () {

    this.originalGuests.forEach( guest => {
      let specialGuest = _.find(this.guests, {email: guest.email});
      if (specialGuest) {
        specialGuest.count ++;
      } else {
        guest.count = 1;
        this.guests.push(guest);
      }
    });

    this.guests = _(this.guests).orderBy('count').reverse().value();

    return {
      uniqueGuests: this.guests.length,
      topGuests: this.topHTML(_.take(this.guests, 3))
    }

  }

  topHTML (guests) {
    let html = '';
    guests.forEach( guest => {
      let name = guest.name.replace(/\b[a-z]/g, fl => fl.toUpperCase());
      html += `<li><a href="/guests/${guest.id}">(${guest.count}) ${name}</a></li>`;
    })
    return html;
  }

}

export default Chart2