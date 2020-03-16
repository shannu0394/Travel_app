import * as Pikaday from 'pikaday/pikaday.js';

import moment from 'moment';
moment().format();


/* Date picker */
const picker = new Pikaday({
  field: document.getElementById('datepicker'),
  format: 'D MMM YYYY',
  onSelect: function () {
    const departure = this.getMoment().format('YYYY, M, D');
    console.log(departure)
    return departure
  },
});

/* const pickerDown = new Pikaday({
  field: document.getElementById('datepicker'),
  format: 'YYYY, M, D',
  onSelect: function () {
    const departure = this.getMoment().format('YYYY, M, D');
    console.log(departure)
    return departure
  },
}); */

export { picker }
