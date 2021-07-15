const express = require('express');
const { mediosdepago } = require('../data/mediosdepago.json');


function mediosdepagoget(req, res) {
    res.status(200).json(mediosdepago);
};

function mediosdepagopost(req, res) {
    const nuevomediodepago = req.body.newmediopago;
    console.log(nuevomediodepago);
    mediosdepago.push(nuevomediodepago);
    res.status(200).json(mediosdepago);
}

function mediosdepagoput(req, res) {
    const mediodepago1 = req.body.acambiar;
    const cambiomediodepago = req.body.cambiarpor;
    const index = mediosdepago.indexOf(mediodepago1);
    if (index != -1) {
        mediosdepago[index] = cambiomediodepago;
        return res.status(200).json(mediosdepago);
    };
    res.status(404).send(`El medio de pago ${mediodepago1} no se encontro.`);
}

function mediosdepagodelete(req,res) {
    const mpaborrar = req.body.mpaborrar;
    const index = mediosdepago.indexOf(mpaborrar);
    if (index != -1) {
        mediosdepago.splice(index, 1);
        return res.status(200).json(mediosdepago);
    };
    res.status(404).send(`El medio de pago ${mediodepago1} no se encontro.`);
}

module.exports = {
    mediosdepagoget,
    mediosdepagopost,
    mediosdepagoput,
    mediosdepagodelete
}