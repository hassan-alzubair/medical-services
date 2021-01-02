const authDao = require('./auth_dao');
const { v4: uuidv4 } = require('uuid');
const userService = require('../users/user_service');
const Errors = require('../common/exceptions');
const moment = require('moment');

exports.createOtp = async (mobileNumber, roleId) => {
    let otp = await generateCode(roleId, mobileNumber);
    // TODO: send otp with sms, code = otp.code
    return {
        success: true
    };
};

exports.verifyOtp = async (mobileNumber, code) => {
    console.log(`verify otp, mobile = ${mobileNumber}, otp = ${code}`);
    if (mobileNumber === undefined || mobileNumber === '' || code === undefined || code === '')
        throw new Errors.InvalidInputException("invalid mobile");

    let user = await userService.findUser(null, mobileNumber);
    if (!user) {
        throw new Errors.InvalidInputException();
    }

    let otp = await authDao.getByCode(user.id, code);

    if (!otp || !user)
        throw new Errors.InvalidInputException("invalid otp or user");

    if (otp.user_id !== user.id)
        throw new Errors.UnauthorizedException("otp not for user");

    if (moment(otp.expires_at).isBefore(moment()))
        throw new Errors.UnauthorizedException("otp is expired");

    await authDao.setCodeUsed(otp.id);

    let accessTokenExpiration = moment().add(14, "days");
    let accessToken = uuidv4();
    let token = await authDao.createAccessToken(user.id, accessTokenExpiration, accessToken);

    return {
        user: user,
        access_token: token.access_token,
        expires_at: token.expires_at
    };
};

exports.authenticateToken = async (token) => {
    let accessToken = await authDao.getAccessToken(token);
    if (!accessToken)
        return false;

    if (moment(accessToken.expires_at).isBefore(moment()))
        return false;

    let user = await userService.findUser(accessToken.user_id, null);

    return user;
};

exports.logout = (token) => {
    console.log(`logout usecase, token = ${token}`);
    if (token === '' || token === null || token === undefined)
        throw new Errors.InvalidInputException();

    return authDao.deleteToken(token);
};

exports.generateOTPForUser = async (roleId, mobileNumber) => {
    let code = await generateCode(roleId, mobileNumber);
    return {
        code: code.code
    };
};

const generateCode = async (roleId, mobileNumber) => {
    console.log(`create otp, mobile = ${mobileNumber}, role id = ${roleId}`);
    if (mobileNumber === undefined || mobileNumber === '' || roleId === undefined || roleId === '')
        throw new Errors.InvalidInputException();

    let user = await userService.findUser(null, mobileNumber);
    if (user === null) {
        user = await userService.createUser(mobileNumber, roleId);
    } else {
        if (user.role_id !== Number(roleId)) {
            throw new Errors.UnauthorizedException();
        }
    }

    let code = generateOtp();
    let expiration = moment().add(1, "hours");
    return authDao.createOtp(user.id, code, expiration);
}

function generateOtp() {
    if (process.env.NODE_ENV === 'local')
        return 1234;
    return Math.floor(1000 + Math.random() * 9000);
}
