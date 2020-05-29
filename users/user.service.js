const jwt = require("jsonwebtoken");
const fs = require("fs");

// users hardcoded for simplicity, store in a db for production applications

module.exports = {
    authenticate,
    makeOne,
    changePassword
};

let users = JSON.parse(fs.readFileSync("data/users.json", "utf8"));

async function authenticate({ username, password }) {
    const user = users.find(
        (u) => u.username === username.toLowerCase() && u.password === password
    );
    if (user) {
        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token,
        };
    }
}

async function makeOne({ username, password}) {


    if (users.find(u => u.username == username )){
        return "user exists"
    } else if ( password.length < 8) {
        return "password must be at least 8 characters"
    } else {       
        users.push({
            "username": username,
            "password": password,
            "groups": ["trial"]
        })
        
        fs.writeFileSync("data/users.json", JSON.stringify(users));
        
        return "user created"
    }
}

async function changePassword({ username, password, newpassword }) {
    const userIndex = users.findIndex((u) => u.username === username.toLowerCase() && u.password === password
    );

    if (userIndex !== -1 ) {
        users[userIndex] = { ...users[userIndex], password: newpassword };
        fs.writeFileSync("data/users.json", JSON.stringify(users));

        return "Password Changed"
    }

}
