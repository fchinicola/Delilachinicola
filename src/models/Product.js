const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: String,
        precio: {type: Number, required: true }
    });

const Product = mongoose.model('Product', productSchema);

//Creando el Menu
addMenu = async () => {
    try {
        let menu = await Product.findOne({ nombre: 'Papas Fritas' });
        if (menu === null) {
            const menu = new Product({ nombre: 'Papas Fritas', precio: 300 } );
            await menu.save((err) => { if (err) return handleError(err) });
            console.log(menu);
            return menu;
        } else {
            console.log('menu ya creado.');
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = Product;