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

/* GEONAMES API */
const geoKey = '&maxRows=10&username=ohick';
const geoUrl = 'http://api.geonames.org/searchJSON?q=';

let cityFromClient = {};
let apiData = {};
let cityData = {};

const getGeonamesData = async (geoUrl, city, geoKey) => {
  const res = await fetch(geoUrl + city + geoKey);
  const geoData = await res.json();
  apiData = {...geoData}
  cityData = {
    longitude: apiData.geonames[0]['lng'],
    latitude: apiData.geonames[0]['lat'],
    country: apiData.geonames[0]['countryName']
  }
  console.log(cityData)
  return cityData;
};

app.post('/cityName', (req, res) => {
  cityFromClient = {...req.body}
  console.log(cityFromClient)
  res.send(getGeonamesData(geoUrl,cityFromClient.cityname,geoKey));
}); 

/* DARK SKY API */
//url/[key]/[latitude],[longitude],[time.getTime()]';
const skyUrl = 'https://api.darksky.net/forecast/';
const skyKey = '1e9e4d4528a0b6a9d07e8c1929ed9c59/';
const units = '&unit=si'


