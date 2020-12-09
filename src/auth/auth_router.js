const express = require('express');
const authController = require('./auth_controller');
const router = express.Router();

router.post('/otp', authController.otp);
router.post('/verify', authController.verify);

module.exports = router;
