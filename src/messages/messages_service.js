const messagesDao = require('./messages_dao');
const Errors = require('../common/exceptions');

exports.sendMessage = async (message) => {
    // TODO: validate message object
    let createdMessage = await messagesDao.createMessage(message);

    // TODO: notify receiver
    return messagesDao.getById(createdMessage.id);
};

exports.getMessage = async (userId, otherUserId, lastMessageId = null, pageSize = 10) => {
    if (otherUserId === undefined || otherUserId === '')
        throw new Errors.InvalidInputException();
    return messagesDao.getMessages(userId, otherUserId, lastMessageId, pageSize);
};
