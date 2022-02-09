const express = require('express');
const router = express.Router();




// Opraciones sobre pedidos
router.get('/admin/pedidos', );
router.get('/admin/pedidos/:id', );
router.put('/admin/pedidos/:id', );
router.delete('/admin/pedidos/:id', );

//Operaciones sobre medios de pago
router.get('/admin/payments', );
router.get('/admin/payments/:id', );
router.post('/admin/payments', );
router.put('/admin/payments:id', );
router.delete('/admin/payments/:id', );

//Operaciones sobre 

module.exports = router;