const userRepo = require('./user_repository');
const authService = require('../auth/auth_service');
const Errors = require('../common/exceptions');

exports.createOtp = async (mobileNumber) => {
    if (mobileNumber === undefined || mobileNumber === '')
        throw new Errors.InvalidInputException();
    let user = await userRepo.findByMobile(mobileNumber);
    if (user === null) {
        user = await userRepo.createUser(mobileNumber);
    }
    let otp = await authService.createOtp(user.mobile_number);
    // TODO: send otp in sms
    return {
        success: true,
        code: otp.code
    };
};
