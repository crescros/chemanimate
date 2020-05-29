const expressJwt = require('express-jwt');


module.exports = jwt;

function jwt() {

    return expressJwt({ secret: process.env.SECRET }).unless({
        path:[
            /favicon.ico/, // for dev
            /chemanimate-app1\/app/,
            /chemanimate-app1\/api\/users\/authenticate/,
            /chemanimate-app1\/api\/users\/create/,
            /chemanimate-app1\/api\/animations\/trials/
        ]
    });
}
