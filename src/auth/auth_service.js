const authRepository = require('./auth_repository');
const {v4: uuidv4} = require('uuid');
const userService = require('../users/user_service');
const Errors = require('../common/exceptions');
const moment = require('moment');

exports.createOtp = async (mobileNumber, roleId) => {
    if (mobileNumber === undefined || mobileNumber === '' || roleId === undefined || roleId === '')
        throw new Errors.InvalidInputException();

    let user = await userService.findUser(null, mobileNumber);
    if (user === null)
        user = await userService.createUser(mobileNumber, roleId);

    let code = generateOtp();
    let expiration = moment().add(1, "hours");
    let otp = await authRepository.createOtp(user.id, code, expiration);
    // TODO: send otp with sms
    return {
        success: true,
        code: otp.code
    };
};

exports.verifyOtp = async (mobileNumber, code) => {
    if (mobileNumber === undefined || mobileNumber === '' || code === undefined || code === '')
        throw new Errors.InvalidInputException();

    let otp = await authRepository.getByCode(code);
    let user = await userService.findUser(null, mobileNumber);

    if (!otp || !user)
        throw new Errors.InvalidInputException();

    if (otp.user_id !== user.id)
        throw new Errors.UnauthorizedException();

    if (otp.used === true)
        throw new Errors.InvalidInputException();

    if (moment(otp.expires_at).isBefore(moment()))
        throw new Errors.UnauthorizedException();

    await authRepository.setCodeUsed(otp.id);

    let accessTokenExpiration = moment().add(14, "days");
    let accessToken = uuidv4();
    let token = await authRepository.createAccessToken(user.id, accessTokenExpiration, accessToken);

    return {
        user: user,
        access_token: token.access_token,
        expires_at: token.expires_at
    };
};

exports.authenticateToken = async (token) => {
    let accessToken = await authRepository.getAccessToken(token);
    if (!accessToken)
        return false;

    if (moment(accessToken.expires_at).isBefore(moment()))
        return false;

    let user = await userService.findUser(accessToken.user_id, null);
    if (!user.activated)
        return false;

    return user;
};

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
}
