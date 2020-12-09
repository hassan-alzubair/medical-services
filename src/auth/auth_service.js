const authRepository = require('./auth_repository');
const moment = require('moment');

exports.createOtp = (mobileNumber) => {
    let code = generateOtp();
    let expiration = moment().add(1, "hours");
    return authRepository.createOtp(mobileNumber, code, expiration);
};

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
}
