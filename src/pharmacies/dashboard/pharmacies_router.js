const authController = require('../../auth/auth_controller');
const pharmacyController = require('./pharmacies_controller');
const express = require('express');
const router = express.Router();

router.post('/', authController.authenticate, authController.isSupervisor, pharmacyController.createPharmacy);

module.exports = router;