const { usuarios } = require('../data/usuarios.json');

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
};
