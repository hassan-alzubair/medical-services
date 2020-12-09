const authRepository = require('./auth_repository');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

exports.createOtp = (userId) => {
    let code = generateOtp();
    let expiration = moment().add(1, "hours");
    return authRepository.createOtp(userId, code, expiration);
};

exports.getByCode = (code) => {
    return authRepository.getByCode(code);
};

exports.createAccessToken = async (userId) => {
    let accessTokenExpiration = moment().add(14, "days");
    let accessToken = uuidv4();
    return authRepository.createAccessToken(userId, accessTokenExpiration,accessToken);
};

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
}
