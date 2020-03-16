import { newTrip, button} from './js/newtrip';
import { checkIfDeleteButton} from './js/deletetrip'


import './styles/style.scss';
import './styles/cards.scss';
//import 'pikaday/scss/pikaday.scss';

export { 
  newTrip
};

button.addEventListener('click', newTrip);

document.addEventListener('click', checkIfDeleteButton);