const { encriptar } = require("../middlewares/auth");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const User = require("../models/User");
const { ErrorHandler, handleError } = require("../middlewares/errors");

async function showUsers(req, res) {
  if (req.params.userid === undefined) {
    try {
      const allusers = await User.find({});
      return res.status(200).json(allusers);
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
  try {
    const userquery = await User.findOne({ _id: req.params.userid })
    res.status(200).json(userquery)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};

async function validateUser(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ErrorHandler(404, 'Debe completar los campos usuario y contraseña');
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new ErrorHandler(404, 'El usuario ingresado no se encuentra en la base de datos');
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function userLogin(req, res) {
  try {
    const { username, password } = req.body;
    const query = User.where({
      username,
      password: await encriptar(password),
    });
    query.findOne((err, usuario) => {
      if (err)
        return handleError(err);
      if (usuario) {
        jwt.sign({
          _id: usuario._id,
          admin: usuario.admin
        }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
          if (err)
            return handleError(err);
          if (token) {
            console.log(`Se a logeado el iduser: ${usuario._id.toString()}`);
            res.status(202).json({ token });
          };
        });
      } else {
        res.status(400).json(`Usuario o contraseña invalida`);
      }
    });
  } catch {
    res.status(400).json(`Error al iniciar sesión, intentelo nuevamente`);
  }
}

async function createUser(req, res) {
  try {
    if (!req.body || !req.body.password) {
      return res.send('No body send')
    }
    const nuser = new User({
      username: req.body.username,
      password: await encriptar(req.body.password),
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      email: req.body.email
    });
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
  suspender,
  validateUser
}