const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewURLParser: true, useUnifiedTopology: true });

// Conectando la base de datos
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Connectado a MongoDB Atlas')
});

// Models
require('./User');
require('./Product');
require('./Payment');
addAdmin();
addMenu();