const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewURLParser: true, useUnifiedTopology: true });

// Conectando la base de datos
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Connectado a MongoDB Atlas')
});

// Models
require('./models/User');
require('./models/Product');
require('./models/Payment');
require('./models/Pedido');
addAdmin();
addMenu();