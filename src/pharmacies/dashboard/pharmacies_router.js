const authController = require('../../auth/auth_controller');
const pharmacyController = require('./pharmacies_controller');
const uploadFileMiddleware = require('../../common/upload_image_middleware');
const express = require('express');
const router = express.Router();

router.post('/', authController.authenticate, authController.isSupervisor, uploadFileMiddleware.uploadAvatar, pharmacyController.createPharmacy);
router.get('/total', authController.authenticate, authController.isSupervisor, pharmacyController.getTotal);
router.get('/', authController.authenticate, authController.isSupervisor, pharmacyController.getPharmacies);

module.exports = router;
