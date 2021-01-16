const pharmacyService = require('../pharmacies_service');
const resWrapper = require('../../common/http_response_wrapper');

exports.createPharmacy = async (req, res) => {
    let pharmacy = req.body;
    if (req.file){
        pharmacy.logo = req.file.path;
    }
    try {
        let result = await pharmacyService.createPharmacy(pharmacy);
        resWrapper.success(res, result);
    } catch (error) {
        console.log(error);
        resWrapper.error(res, error);
    }
};

exports.getTotal = async (req, res) => {
    try {
        let result = await pharmacyService.getTotal();
        resWrapper.success(res, result);
    } catch (error) {
        console.log(error);
        resWrapper.error(res, error);
    }
};

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
