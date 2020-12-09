const express = require('express');
const userController = require('./user_controller');
const router = express.Router();

router.post('/otp', userController.otp);

module.exports = router;
