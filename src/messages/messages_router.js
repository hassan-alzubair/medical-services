const express = require('express');
const authController = require('../auth/auth_controller');
const messagesController = require('./messages_controller');
const router = express.Router();

router.post('/', authController.authenticate, messagesController.sendMessage);
router.get('/', authController.authenticate, messagesController.getMessages);
router.get('/latest', authController.authenticate, messagesController.getLatest);

module.exports = router;
