const express = require('express');
const { authorize, needsAdmin } = require('../middlewares/auth');
const router = express.Router();

//const product
router.get('/productos/:idproducto?', (req, res) => res.send(`TODO ${req.query.idproducto}`))
router.post('/admin/prodcuctos', authorize, needsAdmin,)
router.put('/admin/productos/:idproducto', authorize, needsAdmin,)
router.delete('/admin/producot/:idproducto', authorize, needsAdmin, )


module.exports = router;