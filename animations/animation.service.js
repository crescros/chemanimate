const config = require('../config.json');
const jwt = require('jsonwebtoken');
const fs = require('fs')


module.exports = {
    getAll,
    getOne
};

const animations = JSON.parse(fs.readFileSync('data/animations.json', 'utf8'))


async function getAll() {
    return animations
}

async function getOne(id) {

    return animations.data.find(a =>{
        console.log(a.id)
        return a.id == id
    })
}
