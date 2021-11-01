const { DataTypes } = require('sequelize');

function creaProductoModelo(connection) {
  const Producto = connection.define('Producto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unque: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Producto;
}

module.exports = {
  creaProductoModelo,
};
