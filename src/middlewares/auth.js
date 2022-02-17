const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
const User = require('../models/User');
const { JWT_SECRET } = process.env;


function encriptar(secret) {
    return createHmac('sha256', secret).digest('hex');
};


function authorize(req, res, next) {
    const authHeader = req.headers['authorization'] || '';
    if (typeof authHeader !== 'undefined') {
        const token = authHeader.replace('Bearer ', '');
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send('Usted no se encuentra autorizado.')
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

function needsAdmin(req, res, next) {
    if (!req.user.admin) {
        return res.status(401).send('Usted no se encuentra autorizado.');
    }
    next();
} 



module.exports = {
    authorize,
    encriptar,
    needsAdmin,
}