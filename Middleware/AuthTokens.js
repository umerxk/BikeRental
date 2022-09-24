const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config();
const { parsed } = dotEnv;


const generateToken = (id) => {
    return jwt.sign({id}, parsed.JWT_SECRET);
}

module.exports = {
    generateToken
}
