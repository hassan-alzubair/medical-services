const authController = require('../../auth/auth_controller');
const pharmacyController = require('./pharmacies_controller');
const express = require('express');
const router = express.Router();

router.get('/', authController.authenticate, pharmacyController.getPharmacies);

module.exports = router;