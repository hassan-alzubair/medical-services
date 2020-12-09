const authRepository = require('./auth_repository');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

exports.createOtp = (mobileNumber) => {
    let code = generateOtp();
    let expiration = moment().add(1, "hours");
    return authRepository.createOtp(mobileNumber, code, expiration);
};

exports.getByCode = (code) => {
    return authRepository.getByCode(code);
};

exports.createAccessToken = async (mobileNumber) => {
    let accessTokenExpiration = moment().add(14, "days");
    let accessToken = uuidv4();
    return authRepository.createAccessToken(mobileNumber, accessTokenExpiration,accessToken);
};

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
}
