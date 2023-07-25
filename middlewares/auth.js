require('dotenv').config()
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenKey = process.env.TOKEN_KEY || 'myTokenKey'


const authenticate = (req, res, next) => {

    const token = req.headers["authorization"].split(' ')[1]
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();

}
module.exports = { authenticate }
