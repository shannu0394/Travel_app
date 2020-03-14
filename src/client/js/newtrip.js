import {picker} from './pikaday.js';

import defaultImage from '../styles/location.png';

/* require fetchWrapper module written in commonJS */
const fetchWrapper = require('fetchWrapper/fetchWrapper');
const FetchOptions = require('fetchWrapper/FetchOptions'); 

const button = document.getElementById('generate');
const cardParent = document.getElementById('cardParent');

/* Check if no result from Pixabay API */
const imageCheck = (img) => {
  return img ?? defaultImage;
 };

 /* Countdown for departure */ 
 //VOIR SUR MOMENT  https://momentjs.com/docs/#/displaying/tonow/
const countdown = (picker) => {
  const today = new Date();
  const BigDay = new Date(picker);
  const msPerDay = 24 * 60 * 60 * 1000;
  const timeLeft = (BigDay.getTime() - today.getTime());
  const e_daysLeft = timeLeft / msPerDay;
  const daysLeft = Math.ceil(e_daysLeft);
  return daysLeft
};

/*/ DOM Create the card element */
const createTravelCard = (data) => {
  let cardHolder = document.createDocumentFragment();
  const card = document.createElement('div');
  card.className = "card";
  card.innerHTML = `
    <img src="${imageCheck(data.img)}" alt="Picture of the destination" class="image" id="image">
    <div class="results">
      <h2>${data.city}, ${data.country}</h2>
      <div>Departure date : ${picker}</div>
      <div>${countdown(picker)} days left before your departure to ${data.city}!</div>
      <div>Weather : ${data.temperature}°C, ${data.weatherSummary}</div>
    </div>
    <button class="delete">Delete</button>`;
  cardHolder.appendChild(card);
  return cardHolder;
};

/* Post client data to server, get API datas, update the UI */
const newTrip = async () => {
  let city = document.getElementById('city').value;
  const options = new FetchOptions({city: city}, 'POST', {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  const data = await fetchWrapper('http://localhost:3000/add', options);
  console.log(data);
  cardParent.appendChild(createTravelCard(data));
  cardParent.classList.remove('hidden');
};

export {
  newTrip,
  button
}
