const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * App Routes
 */

router.get('/', userController.homepage);

module.exports = router;