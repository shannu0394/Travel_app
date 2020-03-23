/* Node Modules */
import fetchWrapper from 'fetchWrapper';
import FetchOptions from 'fetchWrapper/FetchOptions';
import moment from 'moment';

/* Project modules */
import { FORMAT } from './datepickerConfig';
import picker from './pikaday.js';
import {imageCheck, cityCheck} from './helpers';
import mapWeatherIcon from './mapWeatherIcon';

//Constant exported to index.js
const button = document.getElementById('generate');

/**
 * Function to create a card element using the APIs data
 * 
 * @param {Object} data The API responses sent from the server
 */
const createTravelCard = (data) => {
  //Create a countdown from the departure date to today
  let todayNoHours = moment(moment().format(FORMAT), FORMAT, 'en');
  let daysTo = todayNoHours.diff(moment(picker.toString(), FORMAT, 'en'), 'days');
  let countdownText = (daysTo) => {
    if (daysTo < 0) {
      return `${Math.abs(daysTo)} days left`
    } else if (daysTo === 0) {
      return "Today";
    }
    return `${daysTo} days ago`
  };

  //Define the weather icon
  const icon = mapWeatherIcon(data.icon);

  //Create the card element
  let cardHolder = document.createDocumentFragment();
  const card = document.createElement('div');
  card.className = "card";
  card.innerHTML = `
  <div class="card-top">
    <img src="${imageCheck(data.img)}" alt="Picture of the destination" class="image" id="image">
    <button class="delete"><span class="fas fa-times"></span></button>
    <div class="days">${countdownText(daysTo)}</div>
  </div>
  <div class="card-bottom">
    <div class="place">
      <h2 class="city-name">${cityCheck(data.city)}</h2>
      <h3 class="country-name">${data.country}</h3>
    </div>
    <div class="infos">
      <div class="calendar"><span class="far fa-calendar-alt"></span> ${picker.toString('D/MM')}</div>
      <div class="temp"><span class="fas fa-thermometer-half"></span> ${data.temperature}°C</div>
      <div class="${icon}"><span class="fas fa-${icon}"></span></div>
    </div>
  </div>`;

  //Append the card element
  cardHolder.appendChild(card);
  return cardHolder;
};

/* Post client data to server, get API datas, update the UI */
/**
 * Function to trigger the POST function and to append the new element to the DOM
 * 
 * @param {event} e The event
 */
const newTrip = async (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;

  const options = new FetchOptions({ city: city }, 'POST', {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  const data = await fetchWrapper('http://localhost:3000/add', options);

  const cardParent = document.getElementById('cardParent');
  cardParent.appendChild(createTravelCard(data));
};

export {
  newTrip,
  button
}
