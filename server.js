require('dotenv').config();
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
const routeBase = process.env.APIROOT

app.use(routeBase + '/api/users', require('./users/users.controller'));
app.use(routeBase + '/api/animations', require('./animations/animations.controller'));
app.use(routeBase, require('./client/client.controller'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 3016;
const server = app.listen(port, function () {
    console.log('chemanimate server started.');
    console.log('web app url: http://localhost:' + port + routeBase + '/app');
});
