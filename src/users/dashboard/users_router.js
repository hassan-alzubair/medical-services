const express = require('express');
const authController = require('../../auth/auth_controller');
const usersController = require('./users_controller');

const router = express.Router();

router.get('/', authController.authenticate, authController.isSupervisor, usersController.getUsers);
router.put('/activate/:id', authController.authenticate, authController.isSupervisor, usersController.activateUser);
router.get('/summary', authController.authenticate, authController.isSupervisor, usersController.getSummary);
router.get('/doctors', authController.authenticate, authController.isSupervisor, usersController.getDoctors);
router.get('/nurses', authController.authenticate, authController.isSupervisor, usersController.getNurses);

module.exports = router;
