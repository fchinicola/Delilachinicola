const mongoose = require('mongoose');

const productSchema =new mongoose.Schema(
    {
        nombre: { type: String, required: true, unique: true },
        descripcion: { type: String, required: true },
        precio: {type: Number, required: true }
    });

//Creando el Menu

const Product = mongoose.model('Product', productSchema);

addMenu = async () => {
    try {
        let menu = await Product.findOne({ nombre: 'Papas Fritas' });
        if (menu === null) {
            const menu = new Product({ nombre: 'Papas Fritas', descripcion: "Papas baston cocidas en aceite", precio: 300 } );
            await menu.save((err) => { if (err) return console.log(err) });
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