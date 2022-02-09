const { encriptar } = require("../middlewares/auth");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const User = require("../models/User");

async function homepage(req, res) {
  let usuario1 = await User.findOne({ username: 'admin' });
  console.log(usuario1._id.valueOf());
  res.status(200).send('Hello World');
}

async function showAllUsers(req, res) {
  try {
      const allusers = await User.find({});
      return res.status(200).json(allusers);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};

async function userLogin(req, res) {
  try {
    const { username, password } = req.body;
    const query = User.where({
      username,
      password: encriptar(password),
    })
    query.findOne((err, usuario) => {
      if (err) return handleError(err);
      if (usuario) {
        jwt.sign({
          id: usuario._id,
          admin: usuario.admin,
          username: usuario.usuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          direccion: usuario.direccion,
          telefono: usuario.telefono,
          email: usuario.email,
          pedidos: usuario.pedidos,
        }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
          if (err) return console.log(err);
          if (token) { res.status(200).json({ token }) };
        })
      } else {
        res.status(400).json(`Contraseña invalida`);
      }
    })
  } catch {
    res.status(400).json(`Error al iniciar sesión`);
  }
};

async function createUser(req, res) {
  if (!req.body || !req.body.password) {
    return res.send('No body send')
  }
  const nuser = new User({
    username: req.body.username,
    password: encriptar(req.body.password),
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email
  });
  try {
    const newUser = await nuser.save();
    res.status(201).json({id: newUser._id})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


function getUser(req, res, next) {
  if (req.params.userid === req.user.id) {
    next();
  } else {
    res.send('No es tu usuario')
  }
}

function printuser(req, res) {
  res.json(req.user)
}

module.exports = {
  homepage,
  showAllUsers,
  userLogin,
  createUser,
  getUser,
  printuser
}