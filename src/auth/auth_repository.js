const models = require('../../models/index');
const Otp = models.otps;

exports.createOtp = async (mobileNumber, code, expiration) => {
    let result = await Otp.create({
        code: code,
        mobile_number: mobileNumber,
        expires_at: expiration
    });
    if (result){
        result = result.toJSON();
    }else {
        result = null;
    }
    return result;
};
