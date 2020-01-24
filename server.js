const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
/* Dependencies and middelware*/
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Local server */
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

/* Routes endpoint */
let projectData = {};

/* Routes */
app.get('/data', (req, res) => res.send(projectData));

app.post('/add', add);
function add(req, res) {
    projectData = {...req.body};
    res.send(projectData);
}