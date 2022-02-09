const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        descripcion: {type: String, required: true}
    });

module.exports = mongoose.model('Payment', PaymentSchema);