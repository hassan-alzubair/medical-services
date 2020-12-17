const express = require('express');
const userController = require('./user_controller');
const authController = require('../auth/auth_controller');
const router = express.Router();
const uploadMiddleware = require('./upload_image_middleware');

router.put('/profile', authController.authenticate, uploadMiddleware.uploadAvatar, userController.updateProfile);
router.put('/register_fcm_token', authController.authenticate, userController.registerFCMToken);

module.exports = router;
