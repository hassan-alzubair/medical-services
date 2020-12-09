const models = require('../../models/index');
const Token = models.tokens;
const Otp = models.otps;

exports.createOtp = async (mobileNumber, code, expiration) => {
    let result = await Otp.create({
        code: code,
        mobile_number: mobileNumber,
        expires_at: expiration
    });
    if (result) {
        result = result.toJSON();
    } else {
        result = null;
    }
    return result;
};

exports.getByCode = async (code) => {
    let result = await Otp.findOne({
        where: {
            code: code
        }
    });
    if (result)
        result = result.toJSON();
    else
        result = null;
    return result;
};

exports.createAccessToken = async (mobileNumber, expiration, accessToken) => {
    let result = await Token.create({
        mobile_number: mobileNumber,
        access_token: accessToken,
        expires_at: expiration
    });
    if (result)
        result = result.toJSON();
    else
        result = null;
    return result;
};
