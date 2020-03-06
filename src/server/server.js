const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

/* Routes endpoint */
let projectData = {};

/* Routes */
app.get('/', (req, res) => {
  res.sendFile('src/index.html', { root: `${__dirname}/..` });
});

/* API key */
const key = '&maxRows=10&username=ohick';

/* API URL */
const url = 'http://api.geonames.org/searchJSON?q=';

const getAPIData = async (url, city, key) => {
  const result = await fetch(url + city + key);
  const data = await result.json();
  return data;
};

app.post('/geoNames', (req, res) => {
  getAPIData(url, req.cityname, key);
  res.send(data);
});


/* app.get('/data', (req, res) => {
  
  res.send(projectData)
}); */

