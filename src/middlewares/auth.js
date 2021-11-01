const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
const { usuarios } = require('../data/usuarios.json');

function encript(secret) {
  return createHmac('sha256', secret).digest('hex');
}

function authorize(req, res, next) {
  const { JWT_SECRET } = process.env;
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send('You are not authorized.');
    } else {
      req.user = decoded;
      next();
    }
  });
}

async function authenticate(req, res, next) {
  const { JWT_SECRET } = process.env;
  const { username, password } = req.body;
  // const User = getModel('User');
  const loginUser = await User.findOne({
    where: {
      username,
      password: encript(password),
    },
  });
  if (loginUser) {
    req.token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60,
      nombre: loginUser.nombre,
      apellido: loginUser.apellido,
      username: loginUser.username,
      email: loginUser.email,
    }, JWT_SECRET);
    next();
  } else {
    res.status(403).send('invalid credentials');
  }
}

function userexist(req, res, next) {
  // eslint-disable-next-line no-restricted-syntax
  for (const usuario of usuarios) {
    if (Number(req.headers.userid) === usuario.id) {
      req.user = usuario;
      return next();
    }
  } res.status(401).send('No se a autentificado');
}

function needsAdmin(req, res, next) {
  const iduser = req.headers.userid;
  if (usuarios[iduser].admin) {
    next();
  } else res.status(401).send('No posee los permisos para realizar la accion solicitada');
}

module.exports = {
  userexist,
  needsAdmin,
  authenticate,
  authorize,
};
