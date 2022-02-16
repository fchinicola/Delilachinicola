const { encriptar } = require("../middlewares/auth");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const User = require("../models/User");

async function showUsers(req, res) {
  if (req.query.userid === undefined) { 
    try {
      const allusers = await User.find({});
      return res.status(200).json(allusers);
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
    try {
      const userquery = await User.findOne({_id: req.query.userid})
      res.status(200).json(userquery)
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
        res.status(400).json(`Usuario o contraseña invalida`);
      }
    })
  } catch {
    res.status(400).json(`Error al iniciar sesión, intentelo nuevamente`);
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
    res.status(201).json({ id: newUser._id })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


function suspender(req, res) {
  if (req.params.userid) {
    console.log(req.params.userid)
    User.findOne(
      { _id: req.params.userid },
      (err, usr) => {
        usr.suspendido = !usr.suspendido;
        usr.save((err, result) => {
          if (err) {
            console.log(err)
            res.send(err)
          }
          if (result.suspendido) {
            res.status(200).json(`Se a suspendido el usuario ${req.params.userid}`);
          } else {
            res.status(200).json(`El usuario ${req.params.userid} ya no se encuentra suspendido`);
          }
        })
      }
    )
  }
}

module.exports = {
  showUsers,
  userLogin,
  createUser,
  suspender
}