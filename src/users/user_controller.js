const userService = require('./user_service');
const resWrapper = require('../common/http_response_wrapper');

exports.otp = async (req, res) => {
    let mobileNumber = req.body.mobile_number;
    try{
        let result = await userService.createOtp(mobileNumber);
        console.log(result);
        resWrapper.success(res, result);
    }catch (e) {
        console.log(e.message);
        resWrapper.error(res, e);
    }
};
