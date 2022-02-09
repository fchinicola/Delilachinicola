const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        precio: {type: Number, required: true }
    });

const Product = mongoose.model('Product', ProductSchema);

//Creando el Menu
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