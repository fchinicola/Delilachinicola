const express = require('express');
const router = express.Router();
const google = require('./google');
//const facebook = require('./facebook');  // You can create new strategies 
//const linkedin = require('./linkedin');   
//const github = require('./github');   
//const auth0 = require('./auth0');   


router.get('/failed', (req, res) => res.send('You Failed to log in!'))

router.use('/auth', google);
//router.use('', facebook);
//router.use('', linkedin );
//router.use('', github );
//router.use('', auth0 );

module.exports = router;