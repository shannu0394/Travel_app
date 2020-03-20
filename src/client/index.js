import { newTrip, button} from './js/newtrip';
import { checkIfDeleteButton} from './js/deletetrip'

import './styles/form.scss';
import './styles/cards.scss';

export { 
  newTrip,
};

button.addEventListener('click', newTrip);

document.addEventListener('click', checkIfDeleteButton);