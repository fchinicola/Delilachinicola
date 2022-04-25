const express = require("express");
const router = express.Router();
const { authorize } = require("../../middlewares/auth");
const Pedido = require("../../models/Pedido");
const axios = require("axios");
const url = "https://api.mercadopago.com/checkout/preferences";

async function getMercadoPagoLink(req, res) {
  const { idpedido } = req.params;
  const items = [];
  try {
    const elpedido = await Pedido.findById(idpedido).populate(
      "subpedido.producto",
      "-descripcion"
    );
    if (elpedido.estado !== "Confirmado") {
      return res.send('El pedido debe estar confirmado');
    }
    if (req.user._id !== elpedido.user_id.valueOf()) {
      return res.status(400).json({
        error: true,
        msg: "El pedido no le pertenece",
      });
    }
    elpedido.subpedido.forEach((element) => {
      let obj = {};
      (obj.title = element.producto.nombre),
        (obj.unit_price = element.producto.precio),
        (obj.quantity = element.cant),
        items.push(obj);
    });
    let preferences = {
      items,
      back_urls: {
        success: process.env.MERCADOPAGO_SUCCESS,
        pending: process.env.MERCADOPAGO_PENDING,
        failure: process.env.MERCADOPAGO_FAILURE,
      },
      auto_return: "approved",
    };
    const checkout = await apiMercadoPago(url, preferences);
    return res.send({ "link de pago": checkout.init_point });
  } catch (err) {
    return res.status(500).json({
      error: true,
      msg: "Hubo un error con Mercado Pago",
    });
  }
}

async function apiMercadoPago(url, preferences) {
  try {
    const mpapi = await axios.post(url, preferences, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });
    return mpapi.data;
  } catch (err) {
    return console.log(err);
  }
}

router.post("/payment/new/:idpedido", authorize, getMercadoPagoLink);

router.get("/payment/new/success", (req, res) => {
  res.status(200).json(req.query);
});
router.get("/payment/new/failure", (req, res) => {
  res.status(400).json(req.query);
});
router.get("/payment/new/pending", (req, res) => {
  res.status(400).json(req.query);
});

module.exports = router;
