import Pikaday from 'pikaday/pikaday.js';
import {FORMAT} from './datepickerConfig';

import moment from 'moment';
moment().format();


/* Create the date picker */
const picker = new Pikaday({
  field: document.getElementById('datepicker'),
  format: FORMAT,
  onSelect: function () {
    const departure = this.getMoment().format(FORMAT);
    return departure
  }
});

export default picker;
