const jwt = require('jsonwebtoken')

const config = process.env

const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization'];
    //if no token
    if (!token) {
        return res.status (403).send('A token is required for authentication');
    }
    try {
        token = token.replace(/^Bearer\s+/,"")
        const decode = jwt.verify(token, config.TOKEN_KEY)
        req.user =decode
    }

    catch (err) {
    return res.status (401).send('invalid token');
    }

    return next()
    }

    module.exports = verifyToken;