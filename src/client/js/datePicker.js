import * as Pikaday from 'pikaday/pikaday.js';

const moment = require('moment');
moment().format();

const picker = new Pikaday({
  field: document.getElementById('datepicker'),
  format: 'D MMM YYYY',
  onSelect: function () {
    const departure = this.getMoment().format('Do MMMM YYYY');
    return departure;
  },
});

export {
  picker,
  moment,
}
