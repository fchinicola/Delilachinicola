const Pedido = require('../models/Pedido');
const { ErrorHandler } = require('../middlewares/errors');
const status = ["Pendiente", "Confirmado", "En preparacion", "Enviado", "Entregado"];


// Funcion para sumar el todal del pedidos
function sumartotal(arregloproductos) {
    let total = 0;
    for (const item of arregloproductos) {
        let preciosuma = Number(item.producto.precio) * Number(item.cant);
        total = total + preciosuma;
    }
    return total;
}

//GET de todos pedidos (para el admin)
async function mostrarpedidos(req, res) {
    try {
        const allpedidos = await Pedido.find();
        if (!allpedidos) {
            res.status(404).send('No se encuentran pedidos');
        } else {
            return res.status(200).json(allpedidos);
        }
    } catch (error) {
        res.send(error);
    }
}

//GET de los pedidos que hizo un usuario
async function mostrarpedidosusuario(req, res) {
    try {
        const queryPedidos = await Pedido.find({ user_id: req.user._id }).populate('subpedido.producto', '-descripcion').populate('payment', 'name');
        console.log(queryPedidos.length);
        if (queryPedidos.length < 1) {
            throw new ErrorHandler(404, 'No se encuentran pedidos');
        }
        res.status(200).json(queryPedidos);
    } catch (error) {
        res.send(error)
    }
}

//POST para un nuevo pedido
async function nuevoPedido(req, res) {
    try {
        if (req.body) {
            const nuevopedido = {
                user_id: req.user._id,
                subpedido: req.body.subpedido,
                payment: req.body.payment
            };
            const p = new Pedido(nuevopedido);
            const pedidoguardado = await p.save();
            console.log(pedidoguardado);
            res.status(200).json(pedidoguardado);
        }
    } catch (error) {
        res.send(error);
    }
}


//PUT para actualizar el pedido
async function actualizarPedido(req, res) {
    try {
        const { idpedido } = req.params;
        const querypedido = await Pedido.findById(idpedido);
        querypedido.subpedido.push(req.body);
        const pedidoactualizado = await querypedido.save();
        res.status(200).json(pedidoactualizado.populate('subpedido.producto', '-descripcion').populate('payment', 'name'));
    } catch (error) {
        res.send(error)
    }
}

//PUT para confirmar el pedido por parte de un user
async function confirmarpedido(req, res) {
    try {
        const { idpedido } = req.params;
        const querypedido = await Pedido.findById(idpedido).populate('subpedido.producto', '-descripcion').populate('payment', 'name');
        if (querypedido.estado !== 'Pendiente') {
            throw new ErrorHandler(404, `Su pedido ya se encuentra en un estado ${querypedido.estado}`);
        }
        querypedido.total = sumartotal(querypedido.subpedido);
        querypedido.estado = 'Confirmado';
        const pedidoconfirmado = await querypedido.save()
        res.status(200).json(pedidoconfirmado)
    } catch (error) {
        res.send(error);
    }
}


//DELETE de un admin para borrar un pedido
async function cancelarpedido(req, res) {
    try {
        const { idpedido } = req.params;
        const query = await Pedido.findOne({ _id: idpedido });
        if (!query) {
            throw new ErrorHandler(404, `Su pedido no existe o ya fue eliminado`);
        }
        const result = await Pedido.deleteOne({ _id: idpedido });
        if (result.deletedCount === 1) {
            res.status(200).json(result);
        }
    } catch (error) {
        res.send(error);
    }
}


//PUT para que el admin pueda cambiar el estado del pedido
async function admincambiarestado(req, res) {
    try {
        const { idpedido } = req.params;
        const { newstatus } = req.query;
        const querypedido = await Pedido.findById(idpedido);
        if (!status.includes(newstatus)) {
            throw new ErrorHandler(404, `Su pedido no puede ser actualizado al estado ${newstatus}`);
        }
        querypedido.estado = newstatus;
        const newstatuspedido = await querypedido.save();
        res.status(200).json(newstatuspedido);
    } catch (error) {
        res.send(error)
    }
}


module.exports = {
    mostrarpedidos,
    mostrarpedidosusuario,
    nuevoPedido,
    actualizarPedido,
    confirmarpedido,
    cancelarpedido,
    admincambiarestado
}