const pharmacyService = require('../pharmacies_service');
const resWrapper = require('../../common/http_response_wrapper');

exports.createPharmacy = async (req, res) => {
    let pharmacy = req.body;
    try {
        let result = await pharmacyService.createPharmacy(pharmacy);
        resWrapper.success(res, result);
    } catch (error) {
        console.log(error);
        resWrapper.error(res, error);
    }
};