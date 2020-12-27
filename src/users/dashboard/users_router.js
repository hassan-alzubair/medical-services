const express = require('express');
const authController = require('../../auth/auth_controller');
const usersController = require('./users_controller');

const router = express.Router();

router.put('/activate/:id', authController.authenticate, authController.isSupervisor, usersController.activateUser);

module.exports = router;
