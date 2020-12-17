const messagesService = require('./messages_service');
const resWrapper = require('../common/http_response_wrapper');

exports.sendMessage = async (req, res) => {

    let message = {
        sender_id: req.user.id,
        receiver_id: req.body.receiver_id,
        message: req.body.message
    };

    try {
        let result = await messagesService.sendMessage(message);
        resWrapper.success(res, result);
    } catch (e) {
        console.log(e);
        resWrapper.error(res, e);
    }
};

exports.getMessages = async (req, res) => {
    let userId = req.user.id;
    let otherUserId = req.query.user_id;
    let lastMessageId = req.query.last_message_id;
    let pageSize = req.query.page_size;

    try {
        let result = await messagesService.getMessage(userId, otherUserId, lastMessageId, pageSize);
        resWrapper.success(res, result);
    } catch (e) {
        console.log(e);
        resWrapper.error(res, e);
    }
};
