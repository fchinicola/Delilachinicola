const express = require('express');
const { getUser, printuser } = require('../controllers/userController');
const { authorize, needsAdmin } = require('../middlewares/auth');

const router = express.Router();

//Operaciones sobre pedidos
router.get('/users/:userid',authorize, getUser, printuser);
router.post('/users/:userid/pedido', getUser);
router.put('/users/:userid/pedidos/:pedidoid', getUser);
router.delete('/users/:userid/pedidos/:pedidoid', getUser);

//Operacion Admin sobre pedidos
router.get('/admin/pedidos/:pedidoid?',authorize, needsAdmin, );
router.put('/admin/pedidos/:pedidoid', getUser);

module.exports = router;