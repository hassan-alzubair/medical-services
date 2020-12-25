const pharmacyService = require('../pharmacies_service');
const resWrapper = require('../../common/http_response_wrapper');

exports.getPharmacies = async (req, res) => {
    let pageSize = req.query.page_size;
    let pageNumber = req.query.page_number;

    try {
        let result = await pharmacyService.getPharmacies(pageSize, pageNumber);
        resWrapper.success(res, result);
    } catch (error) {
        console.log(error);
        resWrapper.error(res, error);
    }
};