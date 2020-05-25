const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path:[
            /favicon.ico/, // for dev
            /chemanimate-app1\/app/,
            /chemanimate-app1\/api\/users\/authenticate/,
            /chemanimate-app1\/api\/animations\/trials/
        ]
    });
}
