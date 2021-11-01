const { DataTypes } = require('sequelize');

function creaPedidoModelo(connection) {
  const Pedido = connection.define('Pedido');
  return Pedido;
}

function name(params) {
  
}

module.exports = {
  creaPedidoModelo,
};
