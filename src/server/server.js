/* Node modules */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');

/* Project modules */
const geonamesAPI = require('./geonamesAPI');
const darkSkyAPI = require('./darkskyAPI');
const pixabayAPI = require('./pixabayAPI');

/* Dependencies and middelware */
dotenv.config();
const app = express();
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Local server */
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

/* GET Route */
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/../../dist` });
});

/**
 * POST route
 * 
 * Call the APIs using the data sent from the client
 * Send back to the client an object containing the APIs' responses
 */
app.post('/add', async (req, res) => {
  const city = req.body.city;

  const geonameResponse = await geonamesAPI(city);

  const { latitude, longitude } = geonameResponse;
  const darkSkyResponse = await darkSkyAPI(latitude, longitude);

  const pixabayResponse = await pixabayAPI(city);

  res
  .status(201)
  .send({...req.body,
    ...geonameResponse,
    ...darkSkyResponse,
    img: pixabayResponse
  });
});

module.exports = app;
