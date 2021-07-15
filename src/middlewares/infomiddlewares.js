const express = require('express');
const { usuarios } = require('../data/usuarios.json');
const { todoslospedidos } = require('../router/pedidos')

function emailx2(req, res, next) {
    let correo = req.body.email;
    for (const user of usuarios) {
        if (correo === user.email) {
            return res.status(409).send(`El correo "${correo}" ya se encuenta registrado.`);
        }
    }
    next();
}

function findpedido(req, res, next) {
    const pedidoid = req.params.idpedido;
    const elpedido = todoslospedidos.find(pedido => Number(pedido.id) === Number(pedidoid));
    if (elpedido) {
        req.elpedido = elpedido;
        next();
    } else return res.status(404).send(`No se puede encontrar el pedido ${pedidoid}`);
}

module.exports = {
    emailx2,
    findpedido
}