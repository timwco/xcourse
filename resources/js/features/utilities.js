import Pikaday from 'pikaday';

// Load Date Picker
let date = document.getElementById('datepicker');
if (date) {
  new Pikaday({
    field: date,
    format: 'MMMM Do YYYY',
    position: 'bottom left'
  });
}