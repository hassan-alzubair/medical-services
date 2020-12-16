const authService = require('./auth_service');
const resWrapper = require('../common/http_response_wrapper');
const passport = require('passport');

exports.otp = async (req, res) => {
    let mobileNumber = req.body.mobile_number;
    let roleId = req.body.role_id;

    try {
        let result = await authService.createOtp(mobileNumber, roleId);
        resWrapper.success(res, result);
    } catch (e) {
        console.log(e.message);
        resWrapper.error(res, e);
    }
};

exports.verify = async (req, res) => {
    let mobileNumber = req.body.mobile_number;
    let code = req.body.code;
    try {
        let result = await authService.verifyOtp(mobileNumber, code);
        resWrapper.success(res, result);
    } catch (e) {
        console.log(e.message);
        resWrapper.error(res, e);
    }
};

exports.logout = async (req, res) => {
    let accessToken = req.headers['Authorization'].split(" ")[1];
    try{
        await authService.logout(accessToken);
        resWrapper.success(res);
    }catch (e) {
        console.log(e.message);
        resWrapper.error(res, e);
    }
};

exports.authenticate = (req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user, info) => {
        if (err || user === false) {
            return res.status(401).send({
                code: 401,
                message: 'invalid access token'
            })
        }
        req.user = user;
        next()
    })(req, res, next);
};
