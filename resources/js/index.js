import Pikaday from 'pikaday';

// Load Date Picker
let date = document.getElementById('datepicker');
if (date) {
  new Pikaday({
    field: date,
    format: 'MMM D, YYYY',
    position: 'bottom left'
  });
}