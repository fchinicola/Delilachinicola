const express = require('express');
const router = express.Router();
const { mostrarpedidos, mostrarpedidosusuario, nuevoPedido, confirmarpedido, actualizarPedido, admincambiarestado, cancelarpedido } = require('../controllers/pedidosController');
const { authorize, needsAdmin, validacioniduser } = require('../middlewares/auth');


//Operaciones sobre pedidos
router.get('/users/:iduser/pedidos',authorize, validacioniduser, mostrarpedidosusuario);
router.post('/users/:iduser/pedidos', authorize, validacioniduser, nuevoPedido);
router.put('/users/:iduser/pedidos/:idpedido', authorize, validacioniduser, actualizarPedido);
router.put('/users/:iduser/pedidos/:idpedido/confirmar', authorize, validacioniduser, confirmarpedido);
router.delete('/users/:iduser/pedidos/:idpedido/cancelar', authorize , validacioniduser, cancelarpedido);

//Operacion Admin sobre pedidos
router.get('/admin/pedidos', authorize, needsAdmin, mostrarpedidos);
router.put('/admin/pedidos/:idpedido', authorize, needsAdmin, admincambiarestado);

module.exports = router;