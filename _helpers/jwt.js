const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        // path: [
        //     // public routes that don't require authentication
        //     '/chemanimate-app1',
        //     '/chemanimate-app1/',
        //     '/chemanimate-app1/login',
        //     '/chemanimate-app1/login/',
        //     '/chemanimate-app1/login/style.css',
        //     '/chemanimate-app1/app',
        //     '/chemanimate-app1/app/',
        //     '/chemanimate-app1/app/style.css',
        //     '/chemanimate-app1/forgotpassword',
        //     '/chemanimate-app1/forgotpassword/',
        //     '/chemanimate-app1/forgotpassword/style.css',
        //     '/chemanimate-app1/signup',
        //     '/chemanimate-app1/signup/',
        //     '/chemanimate-app1/signup/style.css',
        // ]
        path:[
            /chemanimate-app1\/app/,
            /chemanimate-app1\/api\/users\/authenticate/
        ]
    });
}
