const express = require('express');
const { productosget, productospost, productosput, validateProductId, productosdelete } = require('../controllers/productsController');
const { authorize, needsAdmin } = require('../middlewares/auth');
const { cache } = require('../middlewares/cache');
const router = express.Router();

//const product
router.get('/productos',cache, productosget)
router.post('/admin/productos', authorize, needsAdmin, productospost)
router.put('/admin/productos/:idproducto', authorize, needsAdmin, validateProductId, productosput)
router.delete('/admin/productos/:idproducto', authorize, needsAdmin, validateProductId, productosdelete)


module.exports = router;