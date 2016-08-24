import Pikaday from 'pikaday';
import './firebase-chat';

// Load Date Picker
let date = document.getElementById('datepicker');
if (date) {
  new Pikaday({
    field: date,
    format: 'MMM D, YYYY',
    position: 'bottom left'
  });
}