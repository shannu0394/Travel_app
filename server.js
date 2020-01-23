//Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
app.use(express.static('public'));

/* Dependencies and middelware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

/* Local server */
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

/* Routes endpoint */
const projectData = {};

/* Route */
app.post('/add', add);
function add(req, res) {
    projectData['city'] = req.body.city,
    projectData['temp'] = req.body.temp
    res.send(projectData);
    console.log(projectData)
};