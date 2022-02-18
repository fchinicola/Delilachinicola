const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        subpedido: [{
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
                },
            cant: { type: Number, required: true }
        }],
        total: { type: Number, default: 0 },
        fecha_de_pedido: { type: Date, default: Date.now() },
        estado: { type: String, enum: ['Pendiente', 'Confirmado', 'En preparacion', 'Enviado', 'Entregado'], default: 'Pendiente' },
        payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
        enviado: { type: Date }
    }
);

module.exports = mongoose.model('Pedido', pedidoSchema);