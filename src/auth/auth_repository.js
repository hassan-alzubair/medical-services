const models = require('../../models/index');
const Token = models.tokens;
const Otp = models.otps;

exports.createOtp = async (userId, code, expiration) => {
    let result = await Otp.create({
        code: code,
        user_id: userId,
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

exports.createAccessToken = async (userId, expiration, accessToken) => {
    let result = await Token.create({
        user_id: userId,
        access_token: accessToken,
        expires_at: expiration
    });
    if (result)
        result = result.toJSON();
    else
        result = null;
    return result;
};
