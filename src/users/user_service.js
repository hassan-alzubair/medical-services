const userRepo = require('./user_repository');
const authService = require('../auth/auth_service');
const Errors = require('../common/exceptions');
const moment = require('moment');

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

exports.verifyOtp = async (mobileNumber, code) => {
    if (mobileNumber === undefined || mobileNumber === '' || code === undefined || code === '')
        throw new Errors.InvalidInputException();

    let otp = await authService.getByCode(code);

    if (otp.mobile_number !== mobileNumber)
        throw new Errors.UnauthorizedException();

    if (moment(otp.expires_at).isBefore(moment()))
        throw new Errors.UnauthorizedException();

    let user = await userRepo.findByMobile(mobileNumber);
    let token = await authService.createAccessToken(mobileNumber);
    return {
        user: user,
        access_token: token.access_token,
        expires_at: token.expires_at
    };
};
