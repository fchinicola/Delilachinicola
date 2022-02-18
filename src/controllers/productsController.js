const mongoose = require('mongoose');
const Product = require('../models/Product');
const { ErrorHandler } = require('../middlewares/errors');
const { refreshCache, eraseCache } = require('../middlewares/cache');

async function validateProductId(req, res, next) {
    try {
        const { idproducto } = req.params;
        if (!idproducto || !mongoose.Types.ObjectId.isValid(idproducto)) {
            throw new ErrorHandler(404, `idproducto: '${idproducto}' incorrrecto`);
        }
        const query_producto = await Product.findOne({ _id: idproducto });
        if (!query_producto) {
            throw new ErrorHandler(404, 'El idproducto no se encuentra en la base de datos');
        }
        next();
    } catch (error) {
        next(error);
    }
}

// GET de productos
async function productosget(req, res) {
    try {
        const allproducts = await Product.find();
        refreshCache('productos', allproducts);
        res.status(200).json(allproducts);
    } catch (error) {
        res.send(error);
    }
}

// Crear nuevo producto con el request.body enviado por el administrador
async function productospost(req, res) {
    try {
        if (typeof req.body.nombre === 'string' &&
            typeof req.body.precio === 'number' &&
            typeof req.body.descripcion === 'string') {
            const { nombre, descripcion, precio } = req.body;
            const newproduct = await Product.create({ nombre, descripcion, precio });
            eraseCache('productos');
            return res.status(201).json(newproduct);
        }
    } catch (err) {
        res.send('Ah ocurrido un problema')
    }
    res.send('No ingreso los campos del producto a crear correctamente')
}

// Actualiza un producto existente con el req.body enviado por el admin
async function productosput(req, res) {
    try {
        const { idproducto } = req.params;
        const { name, descripcion, precio } = req.body;
        const update = await Product.findByIdAndUpdate(idproducto, { name, descripcion, precio });
        const updatedproduct = await Product.findById(idproducto);
        eraseCache('productos');
        res.status(200).json(updatedproduct)
    } catch (error) {
        res.send(error);
    }

}

// Elimina un producto con el req.params enviado siempre q sea requerio por un admin
async function productosdelete(req, res) {
    try {
        const { idproducto } = req.params;
        const toDelete = await Product.deleteOne({ _id: idproducto });
        if (toDelete.deletedCount == 1) {
            eraseCache('productos');
            res.status(200).send(`El producto con id ${idproducto} fue eliminado satisfactoriamente`)
        }
    } catch (error) {
        res.status(400).send(`No existe el idproducto ingresado`);
    }
}

module.exports = {
    validateProductId,
    productosget,
    productospost,
    productosput,
    productosdelete
}