const config = require("../config.json");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// users hardcoded for simplicity, store in a db for production applications

module.exports = {
    authenticate,
    getAll,
    changePassword
};

const users = JSON.parse(fs.readFileSync("data/users.json", "utf8"));

async function authenticate({ username, password }) {
    const user = users.find(
        (u) => u.username === username.toLowerCase() && u.password === password
    );
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token,
        };
    }
}

async function getAll() {
    return users.map((u) => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function changePassword({ username, password, newpassword }) {
    const userIndex = users.findIndex((u) => u.username === username.toLowerCase() && u.password === password
    );

    if (userIndex !== -1 ) {

        console.log(userIndex)
        let newUsers = [...users];
        newUsers[userIndex] = { ...newUsers[userIndex], password: newpassword };
        fs.writeFileSync("data/users.json", JSON.stringify(newUsers));

        return "Password Changed"
    }

}
