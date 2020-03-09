import { postGeonames, button} from '../client/js/geonames';
import { rangepicker } from '../client/js/datePicker'

import './styles/style.scss';
import 'vanillajs-datepicker/sass/datepicker.scss';

export { 
  postGeonames
};

button.addEventListener('click', postGeonames);