const { DataTypes } = require('sequelize');

function creaPedidoProductoModelo(connection, pedidoModelo, productoModelo) {
  const PedidoProducto = connection.define('PedidoProducto', {
    // Model attributes are defined here
    PedidoId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: pedidoModelo,

        // This is the column name of the referenced model
        key: 'id',
      },
    },
    ProductoId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: productoModelo,

        // This is the column name of the referenced model
        key: 'id',
      },
    },
    position: {
      type: DataTypes.INTEGER,
    },
  }, {
    // Other model options go here
    modelName: 'PedidoProducto',
    tableName: 'pedidoproducto',
  });
  return PedidoProducto;
}

module.exports = {
  creaPedidoProductoModelo,
};
