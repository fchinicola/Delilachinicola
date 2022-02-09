const express = require('express');
const router = express.Router();

const { homepage, showAllUsers, getUser, createUser, userLogin, printuser } = require('../controllers/userController');
const { authorize, needsAdmin} = require('../middlewares/auth');


// Login & Register
router.post('/users/login', userLogin);
router.post('/users/register', createUser);

//Operaciones sobre pedidos
router.get('/users/:userid',authorize, getUser, printuser);
router.post('/users/:userid/pedido', getUser);
router.put('/users/:userid/pedido/:pedidoid', getUser);
router.delete('/users/:userid/pedido/:pedidoid', getUser);

//Operaciones "Admin" sobre Usuarios
router.get('/admin/users', authorize, needsAdmin, showAllUsers);
router.get('/admin/users/:userid',authorize,needsAdmin, getUser, (req, res) => {
    res.status(200).json(res.user);
});
router.put('/admin/users/:userid', getUser);





module.exports = router;