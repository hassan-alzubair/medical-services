const resWrapper = require('../../common/http_response_wrapper');
const userService = require('../user_service');

exports.activateUser = async(req, res) => {
    let userId = req.params.id;

    try{
        let result = await userService.activateUser(userId);
        resWrapper.success(res, result);
    }catch(err){
        console.log(err);
        resWrapper.error(res, err);
    }
};