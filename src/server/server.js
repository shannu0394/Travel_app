/* modules */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const fetchWrapper = require('fetchWrapper/src/fetchWrapper');
const FetchOptions = require('fetchWrapper/src/FetchOptions');
dotenv.config();

/* Dependencies and middelware */
const app = express();
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Local server */
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

/* PIXABAY API */
const pixabayAPI = async (city) => {
 const response = await fetchWrapper('https://pixabay.com/api/', new FetchOptions({
    key: process.env.pixKey,
    q : city, 
    per_page : 3
  }));

  return response.totalHits === 0 ? null : response.hits[0]['webformatURL'] ;
};

/* DARK SKY API */
const darkSkyAPI = async (lat, lng) => {
  const response = await fetchWrapper(
    `https://api.darksky.net/forecast/${process.env.skyKey}/${lat},${lng}`,
    new FetchOptions({units: 'si'})
  );
  console.log(response)
  
  return {
    weatherSummary: response.currently.summary,
    temperature: response.currently.temperature,
    icon: response.currently.icon
  };
};

/* GEONAMES API */
const geonamesAPI = async (city) => {
  const geoData = await fetchWrapper('http://api.geonames.org/searchJSON', new FetchOptions({
    'q' : city,
    'maxRows': 10,
    'username': process.env.geoUsername
    }));
  
  return {
    longitude: geoData.geonames[0]['lng'],
    latitude: geoData.geonames[0]['lat'],
    country: geoData.geonames[0]['countryName'],
    city: city === geoData.geonames[0]['countryName'] ? null : city
  };
}; 

/* GET Route */
app.get('/', (req, res) => {
  res.sendFile('src/index.html', { root: `${__dirname}/..` });
});

/* POST Route */
app.post('/add', async (req, res) => {

  const city = req.body.city;

  const geonameResponse = await geonamesAPI(city);

  const { latitude, longitude } = geonameResponse;
  const darkSkyResponse = await darkSkyAPI(latitude, longitude);

  const pixabayResponse = await pixabayAPI(city);

  res.send({...req.body,
    ...geonameResponse,
    ...darkSkyResponse,
    img: pixabayResponse
  });
});
