import {picker} from './pikaday.js';
import defaultImage from '../styles/location.png';
import fetchWrapper from 'fetchWrapper';
import FetchOptions from 'fetchWrapper/FetchOptions';
import moment from 'moment';
import {FORMAT} from './datepickerConfig';

const button = document.getElementById('generate');
const cardParent = document.getElementById('cardParent');

/* Check if no result from Pixabay API */
const imageCheck = (img) => {
  return img ?? defaultImage;
 };

 const mapWeatherIcon = () => {
  clear-day,  
  rain, 
  snow, 
  sleet, 
  wind, 
  fog, 
  cloudy, 
  partly-cloudy-day
 }

/*/ DOM Create the card element */
//moment('18 Mar 2020', 'DD MMM YYYY', 'en').toNow();
const createTravelCard = (data) => {
  let todayNoHours = moment(moment().format(FORMAT), FORMAT, 'en');
  let daysTo = todayNoHours.diff(moment(picker.toString(), FORMAT, 'en'), 'days');
  let countdownText = (daysTo) => {
    if (daysTo < 0) {
      return `${Math.abs(daysTo)} days left`
    } else if (daysTo === 0){
      return "Today";
    }
    return `${daysTo} days ago`
  };
  let cardHolder = document.createDocumentFragment();
  const card = document.createElement('div');
  card.className = "card";
  card.innerHTML = `
  <div class="card-top">
    <img src="${imageCheck(data.img)}" alt="Picture of the destination" class="image" id="image">
    <button class="delete">De</button>
    <div class="days">${countdownText(daysTo)}</div>
  </div>
    <div class="results">
      <h2 class="city-name">${data.city}</h2>
      <h3 class="country-name">${data.country}</h3>
      <div><span class="far fa-calendar-alt"></span> ${picker.toString('D/MM')}</div>
      <div class="temp"><span class="fas fa-thermometer-half"></span> ${data.temperature}°C</div>
      <div class="rain"><span class="fas fa-cloud-showers-heavy"></span>${data.weatherSummary}</div>
    </div>`;
  cardHolder.appendChild(card);
  return cardHolder;
};

/* Post client data to server, get API datas, update the UI */
const newTrip = async (e) => {
  e.preventDefault();
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
