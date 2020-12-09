const userRepo = require('./user_repository');
const authService = require('../auth/auth_service');
const UserRoles = require('../common/constants').UserRoles;
const Errors = require('../common/exceptions');
const moment = require('moment');

exports.createOtp = async (mobileNumber, roleId) => {
    if (mobileNumber === undefined || mobileNumber === '' || roleId === undefined || roleId === '')
        throw new Errors.InvalidInputException();

    let user = await userRepo.findByMobile(mobileNumber);
    if (user === null) {
        user = await userRepo.createUser(mobileNumber, roleId);
        if (user.role_id === UserRoles.USER) { // auto activate for normal users
            await userRepo.activateUser(user.id);
        }
    }
    let otp = await authService.createOtp(user.id);
    // TODO: send otp with sms
    return {
        success: true,
        code: otp.code
    };
};

exports.verifyOtp = async (mobileNumber, code) => {
    if (mobileNumber === undefined || mobileNumber === '' || code === undefined || code === '')
        throw new Errors.InvalidInputException();

    let otp = await authService.getByCode(code);
    let user = await userRepo.findByMobile(mobileNumber);

    if (!otp || !user)
        throw new Errors.InvalidInputException();

    if (otp.user_id !== user.id)
        throw new Errors.UnauthorizedException();

    if (moment(otp.expires_at).isBefore(moment()))
        throw new Errors.UnauthorizedException();

    let token = await authService.createAccessToken(user.id);
    return {
        user: user,
        access_token: token.access_token,
        expires_at: token.expires_at
    };
};
