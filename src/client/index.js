import { postGeonames} from '../client/js/geonames';
import { rangepicker } from '../client/js/datePicker'

Object.assign(DateRangePicker.locales, gb);

import './styles/style.scss';
import 'vanillajs-datepicker/sass/datepicker.scss';

export { 
  postGeonames
};

//button.addEventListener('click', postGeonames);