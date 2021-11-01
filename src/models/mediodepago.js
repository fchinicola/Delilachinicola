const { DataTypes } = require('sequelize');

function creaMediodepagoModelo(connection) {
  const Mediodepago = connection.define('Mediodepago', {
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      unque: true,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  });
  return Mediodepago;
}

module.exports = {
  creaMediodepagoModelo,
};
