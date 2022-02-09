const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema(
    {
        user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        productos: [{type: Schema.Types.ObjectId, ref: 'Product'}],
        fecha_de_pedido: { type: Date, default: Date.now() },
        estado: {type: String, required: true, enum: ['Abierto', 'Cerrado', 'Enviado', 'Cancelado'], default: 'Abierto'},
        payment: { type: Schema.Types.ObjectId, ref: 'Payment'}
    }
);

module.exports = mongoose.model('Pedido', PedidoSchema);