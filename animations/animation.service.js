const config = require('../config.json');
const jwt = require('jsonwebtoken');
const fs = require('fs')


module.exports = {
    getAll,
    getOne,
    getTrials
};

const animations = JSON.parse(fs.readFileSync('data/animations.json', 'utf8'))


async function getAll() {
    return animations
}

async function getOne(id) {
    return animations.data.find(a => {
        return a.id == id
    })
}
async function getTrials() {
    return animations.data.filter(a => {
        if (a.tags) {
            console.log(a.tags)
            return a.tags.includes("trial")
        }
    })
}
