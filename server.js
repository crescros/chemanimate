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
const routeBase = '/chemanimate-app1/api/'

app.use(routeBase + 'users', require('./users/users.controller'));
app.use(routeBase + 'animations', require('./animations/animations.controller'));
app.use('/chemanimate-app1', require('./client/client.controller'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 3016;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
