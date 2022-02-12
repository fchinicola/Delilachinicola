const express = require('express');
const { mediosdepagopost, mediosdepagoput, mediosdepagodelete, mediosdepagoget } = require('../controllers/paymentsController');
const { authorize, needsAdmin } = require('../middlewares/auth');
const router = express.Router();


//Admin Routes for payments
router.get('/admin/payments', authorize, needsAdmin, mediosdepagoget)
router.post('/admin/payments', authorize, needsAdmin, mediosdepagopost)
router.put('/admin/payments/:idpayment', authorize, needsAdmin, mediosdepagoput)
router.delete('/admin/payments/:idpayment', authorize, needsAdmin, mediosdepagodelete)

module.exports = router;