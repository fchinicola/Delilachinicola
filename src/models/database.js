const Sequelize = require('sequelize');
const { creaMediodepagoModelo } = require('./mediodepago');
const { creaPedidoModelo } = require('./pedido');
const { creaPedidoProductoModelo } = require('./PedidoProducto');
const { creaProductoModelo } = require('./producto');
const { creaUsuariosModelo } = require('./user');

const models = {};

async function connect(host, port, username, password, database) {
  const connection = new Sequelize({
    database,
    username,
    password,
    host,
    port,
    dialect: 'mariadb',
  });
  models.User = creaUsuariosModelo(connection);
  models.Producto = creaProductoModelo(connection);
  models.Pedido = creaPedidoModelo(connection);
  models.PedidoProducto = creaPedidoProductoModelo(connection, models.Pedido, models.Producto);
  models.Mediodepago = creaMediodepagoModelo(connection);
  // Relaciones
  models.User.hasMany(models.Pedido);
  models.Pedido.belongsTo(models.User);

  models.Pedido.hasMany(models.Mediodepago);
  models.Mediodepago.belongsTo(models.Pedido);

  models.Pedido.belongsToMany(models.Producto, { through: models.PedidoProducto });
  models.Producto.belongsToMany(models.Pedido, { through: models.PedidoProducto });
  try {
    await connection.authenticate();
    await connection.sync({
      // alter: true
    });
    global.console.log(`Connection to database: ${database} has been established successfully.`);
  } catch (error) {
    global.console.error(`Unable to connect to the database: ${database}`, error);
  }
}

module.exports = {
  connect,
};
