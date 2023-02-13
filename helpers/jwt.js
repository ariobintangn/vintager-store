const jwt = require('jsonwebtoken')
const KONCI = process.env.THIS_KEY

const createToken = (payload) => jwt.sign(payload, KONCI);
const verifyToken = (token) => jwt.verify(token, KONCI);

module.exports = {
    createToken,
    verifyToken
};