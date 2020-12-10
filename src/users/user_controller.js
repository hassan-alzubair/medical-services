const resWrapper = require('../common/http_response_wrapper');
const userService = require('../users/user_service');

exports.updateProfile = async (req, res) => {
    let userId = req.user.id;
    let roleId = req.user.role_id;

    let data = req.body;
    if (req.file) {
        data.profile_image = req.file.path
    }
    try {
        let result = await userService.updateProfile(userId, roleId, data);
        resWrapper.success(res, result);
    } catch (e) {
        console.log(e);
        resWrapper.error(res, e);
    }
};
