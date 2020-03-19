import * as Pikaday from 'pikaday/pikaday.js';
import {FORMAT} from './datepickerConfig';

import moment from 'moment';
moment().format();


/* Date picker */
const picker = new Pikaday({
  field: document.getElementById('datepicker'),
  format: FORMAT,
  onSelect: function () {
    const departure = this.getMoment().format(FORMAT);
    console.log(departure)
    return departure
  }
});

export { picker }
