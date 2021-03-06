const mongoose = require("mongoose");
const { encriptar } = require("../middlewares/auth");
const { ErrorHandler, handleError } = require("../middlewares/errors");

const userSchema = new mongoose.Schema({
  admin: { type: Boolean, default: false },
  username: {
    type: String,
    required: [true, "Usuario requerido"],
    unique: [true, "Usuario ya registrado"],
  },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email requerido"],
    match: /.+\@.+\..+/,
    unique: [true, "Email ya registrado"],
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  linkedin: {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  github: {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  auth0: {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  suspendido: { type: Boolean, default: false },
});

userSchema.virtual("pedidos", {
  ref: "Pedido",
  localField: "_id",
  foreignField: "User",
});

const User = mongoose.model("User", userSchema);

//Creando el Usuario Administrador
addAdmin = async () => {
  try {
    let admin = await User.findOne({ username: "admin", admin: true });
    if (admin === null) {
      const admin = new User({
        admin: true,
        username: "admin",
        password: await encriptar("admin"),
        email: "admin@admin.com",
        nombre: "admin",
        apellido: "admin",
        direccion: "DireccionAdmin",
        telefono: "123123",
      });
      await admin.save((err) => {
        if (err) return console.log(err);
      });
      console.log(admin);
      return admin;
    } else {
      console.log("adminuser ya creado.");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = User;
