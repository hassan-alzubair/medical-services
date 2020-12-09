const userService = require('../users/user_service');
const resWrapper = require('../common/http_response_wrapper');

exports.doctors = async (req, res) => {
    let pageIndex = req.query.page_index || 0;
    let pageSize = req.query.page_size || 10;
    try {
        let results = await userService.getDoctors(pageIndex, pageSize);
        resWrapper.success(res, results);
    } catch (e) {
        console.log(e);
        resWrapper.error(res, e);
    }
};

exports.nurses = async (req, res) => {
    let pageIndex = req.query.page_index || 0;
    let pageSize = req.query.page_size || 10;
    try {
        let results = await userService.getNurses(pageIndex, pageSize);
        resWrapper.success(res, results);
    } catch (e) {
        console.log(e);
        resWrapper.error(res, e);
    }
};
