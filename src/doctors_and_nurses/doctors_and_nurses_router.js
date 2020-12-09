const express = require('express');
const doctorsAndNursesController = require('./doctors_and_nurses_controller');
const router = express.Router();

router.get('/doctor', doctorsAndNursesController.doctors);
router.get('/nurse', doctorsAndNursesController.nurses);

module.exports = router;
