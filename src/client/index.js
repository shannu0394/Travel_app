import { newTrip, button} from './js/newtrip';
import { moment, picker } from './js/datePicker';

import 'pikaday/scss/pikaday.scss';
import './styles/style.scss';

export { 
  newTrip,
};

button.addEventListener('click', newTrip);