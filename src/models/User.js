const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        admin: { type: Boolean, default: false },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        nombre: String,
        apellido: String,
        direccion: String,
        telefono: String,
        email: { type: String, required: true, unique: true },
    });

    UserSchema.virtual('pedidos', {
        ref: 'Pedido',
        localField: '_id',
        foreignField: 'User'
      });

const User = mongoose.model('User', UserSchema);

//Creando el Usuario Administrador
addAdmin = async() => {
    try {
        let admin = await User.findOne({ username: 'admin', admin: true });
        if (admin === null) {
            const admin = new User({ username: 'admin', admin: true, password: 'admin', email: 'unknown' });
            await admin.save((err) => { if (err) return handleError(err) });
            console.log(admin);
            return admin;
        } else {
            console.log('adminuser ya creado.');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = User;