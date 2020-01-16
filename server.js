//Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
app.use(express.static('public'));

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

/* Local server */
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

/* API endpoint */
const projectData = {};

/* API key */
const key = '7888326b26769e661345dc10ca117453';

/* API URL */
const url = 'api.openweathermap.org';

/* Routes */
app.get('/all', getData);

function getData (request, response) {
    response.send(projectData);
  };

app.post('/add', add);

function add(req, res) {
    newEntry = {
        city: req.body.city,
        temp: req.body.temp,
        fav: req.body.fav
    };
    projectData.push(newEntry);
    res.send(projectData);
};