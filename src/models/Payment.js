const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        descripcion: {type: String,}
    });

module.exports = mongoose.model('Payment', PaymentSchema);