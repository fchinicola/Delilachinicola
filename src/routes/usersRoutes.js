const express = require('express');
const router = express.Router();

const { showUsers, createUser, userLogin, suspender } = require('../controllers/userController');
const { authorize, needsAdmin} = require('../middlewares/auth');


// Login & Register
router.post('/users/login', userLogin);
router.post('/users/register', createUser);


//Operaciones "Admin" sobre Usuarios
router.get('/admin/users/:userid?', authorize, needsAdmin, showUsers);
router.put('/admin/users/:userid/suspend', authorize, needsAdmin, suspender)





module.exports = router;