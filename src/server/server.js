const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require('node-fetch');

// Start up an instance of app
/* Dependencies and middelware*/
const app = express();
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Local server */
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

/* Routes */
app.get('/', (req, res) => {
  res.sendFile('src/index.html', { root: `${__dirname}/..` });
});

/* PIXABAY API */
const pixUrl = 'https://pixabay.com/api/';
const pixKey = process.env.pixKey;

const pixabayAPI = async (pixUrl, pixKey, city) => {
  const res = await fetch(pixUrl + pixKey + city);
  const pixData = await res.json();

  let response = {};

  if (pixData.totalHits == 0){
    response['img'] = 'https://pixabay.com/get/55e4d54b4350a414f6da8c7dda79367b1039dfe453596c48702778dd9649c55eb1_640.jpg';
  } else {
    response['img'] = pixData.hits[0]['webformatURL'] ;
  }
  return response;
};


/* DARK SKY API */
const skyUrl = 'https://api.darksky.net/forecast/';
const skyKey = process.env.skyKey;
const units = '?units=si'

const darkSkyAPI = async (skyUrl, skyKey, lat, lng, units) => {
  const res = await fetch(skyUrl + skyKey + lat + ',' + lng + units);
  const darSkyData = await res.json();
  
  return {
    weatherSummary: darSkyData.currently.summary,
    temperature: darSkyData.currently.temperature
  };
};

/* GEONAMES API */
const geoKey = process.env.geoKey;
const geoUrl = 'http://api.geonames.org/searchJSON?q=';

let cityData = {};

const geonamesAPI = async (geoUrl, city, geoKey) => {
  const res = await fetch(geoUrl + city + geoKey);
  const geoData = await res.json();
  
  return {
    longitude: geoData.geonames[0]['lng'],
    latitude: geoData.geonames[0]['lat'],
    country: geoData.geonames[0]['countryName'],
    city: city === geoData.geonames[0]['countryName'] ? null : city
  };
}; 

app.post('/add', async (req, res) => {

  const {city } = req.body;

  const geonameResponse = await geonamesAPI(geoUrl,city,geoKey);

  const {latitude, longitude} = geonameResponse;
  const darkSkyResponse = await darkSkyAPI(skyUrl, skyKey, latitude, longitude, units);

  const pixabayResponse = await pixabayAPI(pixUrl, pixKey, city);

  res.send({...req.body, ...geonameResponse, ...darkSkyResponse, ...pixabayResponse});
});
