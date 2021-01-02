const resWrapper = require('../../common/http_response_wrapper');
const authService = require('../auth_service');

exports.generateOTP = async (req, res) => {
    let roleId = req.body.role_id;
    let mobileNumber = req.body.mobile_number;

    try {
        let result = await authService.generateOTPForUser(roleId, mobileNumber);
        resWrapper.success(res, result);
    } catch (err) {
        console.log(err);
        resWrapper.error(res, err);
    }
};