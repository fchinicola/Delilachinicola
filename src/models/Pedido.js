const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        productos: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        fecha_de_pedido: { type: Date, default: Date.now() },
        estado: { type: String, required: true, enum: ['Pendiente', 'Confirmado', 'En preparacion', 'Enviado', 'Entregado'], default: 'Pendiente' },
        payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
        enviado: { type: Date }
    }
);

module.exports = mongoose.model('Pedido', PedidoSchema);