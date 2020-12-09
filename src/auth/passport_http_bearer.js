const BearerStrategy = require('passport-http-bearer').Strategy;
const authService = require('../auth/auth_service');

exports.Strategy = new BearerStrategy(async (token, cb) => {
    try {
        let user = await authService.authenticateToken(token);
        if (!user)
            cb(null, false);
        else
            cb(null, user);
    } catch (e) {
        console.log(e);
        cb(e);
    }
});
