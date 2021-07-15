const express = require('express');
const { productos } = require('../data/productos.json');

// GET listado de productos
function productosget(req, res) {
    res.status(200).json(productos);
}

// Crear nuevo producto con el request.body enviado por el administrador
function productospost(req, res) {
    const nuevoProducto = new Object(req.body);
    let id = 0;
    if (productos.length > 0) {
        const lastproducto = productos.length - 1;
        id = productos[lastproducto].id;
        id++;
    }
    nuevoProducto.id = id;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
}

// Actualiza un producto existente con el req.body enviado por el admin
function productosput(req, res) {
    const idplato = req.params.idproducto;
    console.log(req.body.pepito);
    for (const producto of productos) {
        if (Number(idplato) === producto.id) {
            if (req.body.descripcion != 'undefined') {
                console.log('a');
                producto.descripcion = req.body.descripcion;
            }
            if (req.body.precio != 'undefined') {
                producto.precio = req.body.precio;
            }
            return res.status(200).json(producto);
        }
    }
    res.status(404).send('El producto no fue encontrado y no se pudo actualizar');
}

// Elimina un producto con el req.params enviado siempre q sea requerio por un admin
function productosdelete(req, res) {
    const idplato = req.params.idproducto;
    for (const producto of productos) {
        if (Number(idplato) === producto.id) {
            const index = productos.indexOf(producto);
            productos.splice(index, 1);
            return res.status(200).json(productos);
        }
    }
    res.status(400).send('Producto no encontrado')
}

module.exports = {
    productosget,
    productospost,
    productosput,
    productosdelete
}