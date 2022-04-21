const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ErrorHandler } = require('./errors');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function encriptar(secret) {
    try {
        return await bcrypt.hash(secret, saltRounds)
    } catch (error) {
        console.log(error)
    }
};


function authorize(req, res, next) {
    const authHeader = req.headers['authorization'] || '';
    if (typeof authHeader !== 'undefined') {
        const token = authHeader.replace('Bearer ', '');
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new ErrorHandler(401, 'Usted no se encuentra logueado.')
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

function needsAdmin(req, res, next) {
    if (!req.user.admin) {
        throw new ErrorHandler(401, 'Usted no se encuentra autorizado.');
    }
    next();
}

function validacioniduser(req, res, next) {
    if (req.user.admin) {
        return next();
    }
    if (req.params.iduser !== req.user._id) {
        throw new ErrorHandler(404, `No se puede realizar la accion pq este pedido no le pertenece`);
    }
    return next();
}


module.exports = {
    authorize,
    encriptar,
    needsAdmin,
    validacioniduser
}
