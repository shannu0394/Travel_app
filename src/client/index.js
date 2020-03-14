import { newTrip, button} from './js/newtrip';
import { checkIfDeleteButton} from './js/deletetrip'

import 'pikaday/scss/pikaday.scss';
import './styles/style.scss';

export { 
  newTrip
};

button.addEventListener('click', newTrip);

document.addEventListener('click', checkIfDeleteButton);