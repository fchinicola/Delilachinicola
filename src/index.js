const express = require('express');
const { userexist, needsAdmin } = require('./middlewares/auth');
const { documentacionSwagger } = require('./middlewares/documentation');
const { emailx2, findpedido } = require('./middlewares/infomiddlewares');
const { login, nuevoUsuario } = require('./router/usuarios');
const { mostrarpedidos, nuevoPedido, actualizarPedido, confirmarpedido, mostrarunpedido, borrarpedido, admincambiarestado } = require('./router/pedidos');
const { productosget, productospost, productosput, productosdelete } = require('./router/productos');
const { mediosdepagoget, mediosdepagoput, mediosdepagopost, mediosdepagodelete } = require('./router/mediosdepago');
const app = express();
app.use(express.json());

// Acciones sobre USUARIOS
app.post('/login', login);
app.post('/register', emailx2, nuevoUsuario);

// Acciones sobre PRODUCTOS
app.get('/productos', productosget);
app.get('/productos/:id', productosget)
app.post('/productos', needsAdmin, productospost);
app.put('/productos/:idproducto', needsAdmin, productosput);
app.delete('/productos/:idproducto', needsAdmin, productosdelete);

// Acciones sobre PEDIDOS
app.get('/pedido', userexist, mostrarpedidos);
app.get('/pedido/:idpedido', userexist, findpedido, mostrarunpedido)
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


app.listen(3000, () => {
  documentacionSwagger(app);
  console.log('Server OK on port 3000');
});