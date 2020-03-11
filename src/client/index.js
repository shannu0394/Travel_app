import { newTrip, button} from './js/newtrip';
import { rangepicker } from '../client/js/datePicker'

import './styles/style.scss';
import 'vanillajs-datepicker/sass/datepicker.scss';

export { 
  newTrip
};

button.addEventListener('click', newTrip);