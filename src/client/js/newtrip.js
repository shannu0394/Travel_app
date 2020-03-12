import { picker, moment } from './datePicker.js'

const button = document.getElementById('generate');
const cardParent = document.getElementById('cardParent');

// Async POST
const postData = async (url = "", dataToPost = {}) => {
  let res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dataToPost)
  });
  try {
    const postedData = await res.json();
    return postedData;
  }
  catch (error) {
    console.log("Error", error);
  }
};

// Gather data
const newTrip = async () => {
  let city = document.getElementById('city').value;
  const data = await postData('http://localhost:3000/add', {
    city,
  });
  console.log(data);
  cardParent.appendChild(createTravelCard(data));
  cardParent.classList.remove('hidden');
};

const createTravelCard = (data) => {
  let cardHolder = document.createDocumentFragment();
  const card = document.createElement('div');
  card.innerHTML = `
  <div class="card" id="card">
    <img src="${data.img}" alt="Picture of the destination" class="image" id="image">
    <div class="results">
      <h2>${data.city}, ${data.country}</h2>
      <div>Departure date : ${picker}</div>
      <div>Weather : ${data.temperature}°C, ${data.weatherSummary}</div>
    </div>
    <button>Delete</button>
  </div>`;
  cardHolder.appendChild(card);
  return cardHolder;
}

export {
  newTrip,
  button
}
