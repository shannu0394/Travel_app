import * as Pikaday from 'pikaday/pikaday.js';

const moment = require('moment');
moment().format();

/* Date picker */
const picker = new Pikaday({
  field: document.getElementById('datepicker'),
  format: 'D MMM YYYY',
  onSelect: function () {
    const departure = this.getMoment().format('YYYY, MM, D');
    return departure;
  },
});

export {picker}
