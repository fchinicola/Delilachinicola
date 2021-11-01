const express = require('express');
const { config } = require('dotenv');
const { userexist, needsAdmin } = require('./middlewares/auth');
const { documentacionSwagger } = require('./middlewares/documentation');
const { emailx2, findpedido } = require('./middlewares/info');
const { login, nuevoUsuario } = require('./routes/usuarios');
const {
  mostrarpedidos, nuevoPedido, actualizarPedido, confirmarpedido, mostrarunpedido, borrarpedido, admincambiarestado,
} = require('./routes/pedidos');
const {
  productosget, productospost, productosput, productosdelete,
} = require('./routes/productos');
const {
  mediosdepagoget, mediosdepagoput, mediosdepagopost, mediosdepagodelete,
} = require('./routes/mediosdepago');
const { connect } = require('./models/database');

const app = express();
app.use(express.json());

// Acciones sobre USUARIOS
app.post('/login', login);
app.post('/register', emailx2, nuevoUsuario);

// Acciones sobre PRODUCTOS
app.get('/productos', productosget);
app.get('/productos/:id', productosget);
app.post('/productos', needsAdmin, productospost);
app.put('/productos/:idproducto', needsAdmin, productosput);
app.delete('/productos/:idproducto', needsAdmin, productosdelete);

// Acciones sobre PEDIDOS
app.get('/pedido', userexist, mostrarpedidos);
app.get('/pedido/:idpedido', userexist, findpedido, mostrarunpedido);
app.post('/pedido', userexist, nuevoPedido);
app.put('/pedido/:idpedido', userexist, findpedido, actualizarPedido);
app.put('/pedido/:idpedido/confirm', userexist, findpedido, confirmarpedido);
app.delete('/pedido/:idpedido', userexist, findpedido, borrarpedido);
app.put('/pedido/:idpedido/newstatus', userexist, needsAdmin, findpedido, admincambiarestado);

// Acciones sobre medios de pago
app.get('/mediosdepago', userexist, needsAdmin, mediosdepagoget);
app.post('/mediosdepago', userexist, needsAdmin, mediosdepagopost);
app.put('/mediosdepago/:idpago', userexist, needsAdmin, mediosdepagoput);
app.delete('/mediosdepago/:idpago', userexist, needsAdmin, mediosdepagodelete);

app.listen(3000, async () => {
  config();
  documentacionSwagger(app);
  global.console.log('Server OK on port 3000');
  const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_HOST,
} = process.env;
  const dbOK = await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);
});
