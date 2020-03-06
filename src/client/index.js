import { postGet, button } from '../client/js/app';

import './styles/style.scss';
import './styles/datepicker.scss'

export { postGet };

button.addEventListener('click', postGet);