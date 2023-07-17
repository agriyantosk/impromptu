require('dotenv').config()
const jwt = require("jsonwebtoken");

const signToken = (input) => {
    const token = jwt.sign(input, process.env.SECRET_KEY);
    return token
};

const verifyToken = (input) => {
    const decoded = jwt.verify(input, process.env.SECRET_KEY)
    return decoded
}

module.exports = { signToken, verifyToken };
