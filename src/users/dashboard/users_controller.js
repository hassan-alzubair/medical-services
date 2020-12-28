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

exports.getDoctors = async (req, res) => {
    let pageSize = req.query.page_size;
    let pageNumber = req.query.page_number;

    try{
        let result = await userService.getDoctors(pageNumber, pageSize);
        resWrapper.success(res, result);
    }catch(err){
        resWrapper.error(res, err);
    }
};

exports.getNurses = async (req, res) => {
    let pageSize = req.query.page_size;
    let pageNumber = req.query.page_number;

    try{
        let result = await userService.getNurses(pageNumber, pageSize);
        resWrapper.success(res, result);
    }catch(err){
        resWrapper.error(res, err);
    }
};