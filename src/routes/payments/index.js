const express = require("express");
const router = express.Router();
const mercadopago = require("./mercadopago")

router.use("/payments", mercadopago);

module.exports = router;