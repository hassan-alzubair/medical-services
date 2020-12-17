const messagesDao = require('./messages_dao');
const firebaseNotifier = require('../libs/firebaseNotifier');
const userService = require('../users/user_service');
const Errors = require('../common/exceptions');

exports.sendMessage = async (message) => {
    // TODO: validate message object
    let createdMessage = await messagesDao.createMessage(message);
    createdMessage = await messagesDao.getById(createdMessage.id);

    let receiverId = createdMessage.receiver_id;
    let token = await userService.getUserFcmToken(receiverId);
    let fcmToken = token.fcm_token;
    let data = {
        notification_type: 'new_message',
        id: createdMessage.id,
        sender_id: createdMessage.sender_id,
        receiver_id: createdMessage.receiver_id,
        sender: JSON.stringify(createdMessage.sender),
        receiver: JSON.stringify(createdMessage.receiver),
        message: createdMessage.message,
        created_at: createdMessage.created_at,
        updated_at: createdMessage.updated_at,
        read: createdMessage.read
    };
    try {
        await firebaseNotifier.pushNotification(fcmToken, data)
    } catch (e) {
        console.log(e);
    }
    return createdMessage;
};

exports.getMessage = async (userId, otherUserId, lastMessageId = null, pageSize = 10) => {
    if (otherUserId === undefined || otherUserId === '')
        throw new Errors.InvalidInputException();
    return messagesDao.getMessages(userId, otherUserId, lastMessageId, pageSize);
};
