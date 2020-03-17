import {picker} from './pikaday.js';
import defaultImage from '../styles/location.png';
import fetchWrapper from 'fetchWrapper/src/fetchWrapper';
import FetchOptions from 'fetchWrapper/src/FetchOptions';
import moment from 'moment';

const button = document.getElementById('generate');
const cardParent = document.getElementById('cardParent');

/* Check if no result from Pixabay API */
const imageCheck = (img) => {
  return img ?? defaultImage;
 };

/*/ DOM Create the card element */
//moment('18 Mar 2020', 'DD MMM YYYY', 'en').toNow();
const createTravelCard = (data) => {
  let todayNoHours = moment(moment().format('DD MMM YYYY'), 'DD MMM YYYY', 'en');
  let daysTo = todayNoHours.diff(moment(picker.toString(), 'DD MMM YYYY', 'en'), 'days');
  let countdownText = (daysTo) => {
    if (daysTo < 0) {
      return `${Math.abs(daysTo)} days left before your departure to ${data.city}!`
    }
    return `${daysTo} days since your departure to ${data.city}!`
  };
  let cardHolder = document.createDocumentFragment();
  const card = document.createElement('div');
  card.className = "card";
  card.innerHTML = `
    <img src="${imageCheck(data.img)}" alt="Picture of the destination" class="image" id="image">
    <div class="results">
      <h2>${data.city}, ${data.country}</p>
      <p>Departure date : ${picker}</p>
      <p>${countdownText(daysTo)}</p>
      <p>Weather : ${data.temperature}°C, ${data.weatherSummary}</p>
    </div>
    <button class="delete">Delete</button>`;
  cardHolder.appendChild(card);
  return cardHolder;
};

/* Post client data to server, get API datas, update the UI */
const newTrip = async () => {
  const city = document.getElementById('city').value;
  
  const options = new FetchOptions({city: city}, 'POST', {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  console.log(city)
  const data = await fetchWrapper('http://localhost:3000/add', options);
  console.log(data);
  cardParent.appendChild(createTravelCard(data));
};

export {
  newTrip,
  button
}
