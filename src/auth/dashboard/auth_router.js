const express = require('express');
const authController = require('../auth_controller');
const dashboardAuthController = require('./auth_controller');
const router = express.Router();

router.post('/generate_otp', authController.authenticate, authController.isSupervisor, dashboardAuthController.generateOTP);

module.exports = router;