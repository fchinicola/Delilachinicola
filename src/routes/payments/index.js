const express = require("express");
const router = express.Router();
const mercadopago = require("./mercadopago")

router.use("/mercadopago", mercadopago);

module.exports = router;