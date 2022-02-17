const express = require('express');

const { authorize, needsAdmin } = require('../middlewares/auth');

const router = express.Router();

//Operaciones sobre pedidos
router.get('/users/:userid',authorize, );
router.post('/users/:userid/pedido', authorize);
router.put('/users/:userid/pedidos/:pedidoid', authorize);
router.delete('/users/:userid/pedidos/:pedidoid', authorize);

//Operacion Admin sobre pedidos
router.get('/admin/pedidos', authorize, needsAdmin, );
router.put('/admin/pedidos/:pedidoid', authorize, needsAdmin, );

module.exports = router;