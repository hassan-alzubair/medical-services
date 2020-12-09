const authService = require('./auth_service');
const resWrapper = require('../common/http_response_wrapper');

exports.otp = async (req, res) => {
    let mobileNumber = req.body.mobile_number;
    let roleId = req.body.role_id;

    try {
        let result = await authService.createOtp(mobileNumber, roleId);
        resWrapper.success(res, result);
    } catch (e) {
        console.log(e.message);
        resWrapper.error(res, e);
    }
};

exports.verify = async (req, res) => {
    let mobileNumber = req.body.mobile_number;
    let code = req.body.code;
    try {
        let result = await authService.verifyOtp(mobileNumber, code);
        resWrapper.success(res, result);
    } catch (e) {
        console.log(e.message);
        resWrapper.error(res, e);
    }
};
