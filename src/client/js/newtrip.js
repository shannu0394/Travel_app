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

 const cityCheck = (city) => {
  return city ?? "Roadtrip";
 }

 const mapWeatherIcon = (expr) => {
  switch(expr) {
    case "clear-day" :
    case "clear-night" :
      return 'sun';
    case "rain" :
      return "cloud-showers-heavy";
    case "snow" :
      return "snowflake";
    case "wind" :
      return "wind";
    case "fog" :
      return "smog";
    case "cloudy" :
      return "cloud";
    case "partly-cloudy-day" :
    case "partly-cloudy-night" :
      return "cloud-sun";
    case "sleet" :
      return "cloud-rain";
  } 
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
  const icon = mapWeatherIcon(data.icon);
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

  const data = await fetchWrapper('http://localhost:3000/add', options);
  console.log(data);
  cardParent.appendChild(createTravelCard(data));
};



export {
  newTrip,
  button
}
