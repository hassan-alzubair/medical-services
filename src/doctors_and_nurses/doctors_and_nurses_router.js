const express = require('express');
const doctorsAndNursesController = require('./doctors_and_nurses_controller');
const authController = require('../auth/auth_controller');
const router = express.Router();

router.get('/doctor', authController.authenticate, doctorsAndNursesController.doctors);
router.get('/nurse', authController.authenticate, doctorsAndNursesController.nurses);

module.exports = router;
