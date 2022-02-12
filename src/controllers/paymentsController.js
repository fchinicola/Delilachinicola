const express = require('express');
const Payment = require('../models/Payment');

//GET de todos los medios de pago (requiere admin)
async function mediosdepagoget(req, res) {
    const mediosdepago = await Payment.find();
    if (mediosdepago == null) {
        res.status(200).send(`No existen medios de pago.`)
    } else {
        res.status(200).json(mediosdepago);
    }
};

//POST para medios de pago (requiere admin)
async function mediosdepagopost(req, res) {
    if (req.body) {
        const mediodepago = new Payment(
            {
                name: req.body.name,
                descripcion: req.body.descripcion
            }
        );
        try {
            const nuevomediodepago = await mediodepago.save();
            res.status(200).json(nuevomediodepago);
        } catch (err) {
            res.status(200).json({ message: err.message });
        }

    } else {
        res.status(400).json('No se pudo crear el medio de pago')
    }
}


//PUT para actualizar el medio de pago
async function mediosdepagoput(req, res) {
    if (req.params) {
        try {
            let paymentid = await Payment.findOne({ _id: req.params.idpayment })
            paymentid.name = req.body.name;
            paymentid.descripcion = req.body.descripcion;
            const  changedpayment = await paymentid.save();
            return res.status(200).json(changedpayment);
        } catch (err) {
            res.status(200).json({ message: err.message });
        }
    } else {
        res.status(404).send(`El medio de pago no se encontro.`);
    }
}


//DELETE de un medio de pago
async function mediosdepagodelete(req,res) {
    if (req.params) {
        const result = await Payment.deleteOne({ _id: req.params.idpayment });
        res.status(200).json(result.deletedCount)
    } else {
        res.status(400).send('No existe el metodo de pago ingresado')
    }
}

module.exports = {
    mediosdepagoget,
    mediosdepagopost,
    mediosdepagoput,
    mediosdepagodelete
}