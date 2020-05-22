const config = require('../config.json');
const jwt = require('jsonwebtoken');
const fs = require('fs')

// users hardcoded for simplicity, store in a db for production applications


module.exports = {
    authenticate,
    getAll
};

const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'))

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
