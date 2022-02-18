const Payment = require('../models/Payment');
const { ErrorHandler } = require('../middlewares/errors')

async function validatePaymentId(req, res, next) {
    try {
        const { idpayment } = req.params;
        if (!idpayment || !mongoose.Types.ObjectId.isValid(idpayment)) {
            throw new ErrorHandler(404, `idpayment: ${idpayment} incorrecto`);
        }
        const query_payment = await Payment.findById(idpayment);
        if (!query_payment) {
            throw new ErrorHandler(404, 'El idpayment no se encuentra en la base de datos');
        }
        next();
    } catch (error) {
        next(error);
    }
}

//GET de todos los medios de pago (requiere admin)
async function mediosdepagoget(req, res) {
    const mediosdepago = await Payment.find();
    if (mediosdepago == null) {
        res.status(200).send(`No existen medios de pago.`);
    } else {
        res.status(200).json(mediosdepago);
    }
}

//POST para medios de pago (requiere admin)
async function mediosdepagopost(req, res) {
    try {
        const { name, descripcion } = req.body;
        if (!name || !descripcion) {
            throw new ErrorHandler(404, 'Debe completar los campos nombre y descripcion');
        }
        const nuevomediodepago = await Payment.create({ name, descripcion });
        res.status(200).json(nuevomediodepago);
    } catch (err) {
        res.status(200).json({ message: err.message });
    }

}


//PUT para actualizar el medio de pago
async function mediosdepagoput(req, res) {
    try {
        const { idpayment } = req.params;
        const { name, descripcion } = req.body;
        if (idpayment) {
            const update = await Payment.findByIdAndUpdate(idpayment, { name, descripcion });
            const updatedpayment = await Payment.findById(idpayment);
            return res.status(200).json(updatedpayment);
        } else {
            res.status(200).json({ message: err.message });
        }
    } catch (err) {
        res.status(404).send(`El medio de pago no se encontro.`);
    }
}


//DELETE de un medio de pago
async function mediosdepagodelete(req, res) {
    if (req.params) {
        const result = await Payment.deleteOne({ _id: req.params.idpayment });
        res.status(200).json(result.deletedCount);
    } else {
        res.status(400).send('No existe el metodo de pago ingresado');
    }
}

module.exports = {
    validatePaymentId,
    mediosdepagoget,
    mediosdepagopost,
    mediosdepagoput,
    mediosdepagodelete
}