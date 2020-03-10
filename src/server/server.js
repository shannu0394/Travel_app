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

/* DARK SKY API */
//url/[key]/[latitude],[longitude],[time.getTime()]';
const skyUrl = 'https://api.darksky.net/forecast/';
const skyKey = '1e9e4d4528a0b6a9d07e8c1929ed9c59/';
const units = '?units=si'

const darkSkyAPI = async (skyUrl, skyKey, lat, lng, units) => {
  const res = await fetch(skyUrl + skyKey + lat + ',' + lng + units);
  const darSkyData = await res.json();
  cityData = {...cityData,
    weatherSummary: darSkyData.currently.summary,
    temperature: darSkyData.currently.temperature
  };
  console.log(cityData);
};

/* GEONAMES API */
const geoKey = '&maxRows=10&username=ohick';
const geoUrl = 'http://api.geonames.org/searchJSON?q=';

let cityData = {};

const geonamesAPI = async (geoUrl, city, geoKey) => {
  const res = await fetch(geoUrl + city + geoKey);
  const geoData = await res.json();
  cityData = {...cityData,
    longitude: geoData.geonames[0]['lng'],
    latitude: geoData.geonames[0]['lat'],
    country: geoData.geonames[0]['countryName']
  }
  darkSkyAPI(skyUrl, skyKey, cityData.latitude, cityData.longitude, units);
};

app.post('/cityName', (req, res) => {
  cityData = {...req.body}
  geonamesAPI(geoUrl,cityData.cityname,geoKey);
});

app.get('/data', (req, res) => res.send(cityData));