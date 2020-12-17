const models = require('../../models');
const Op = require('sequelize').Op;
const Message = models.messages;

exports.createMessage = async (message) => {
    let createdMessage = await Message.create(message);
    if (createdMessage)
        createdMessage = createdMessage.toJSON();
    return createdMessage;
};

exports.getById = async (messageId) => {
    let message = await Message.findOne({
        where: {
            id: messageId
        },
        include: [
            {model: models.users, as: 'sender'},
            {model: models.users, as: 'receiver'}
        ]
    });
    if (message)
        message = message.toJSON();
    return message;
};

exports.getMessages = async (userId, otherUserId, lastMessageId, pageSize) => {
    pageSize = Number(pageSize);
    lastMessageId = Number(lastMessageId);

    let messages = await Message.findAll({
        where: {
            [Op.or]: [
                {
                    sender_id: userId,
                    receiver_id: otherUserId
                },
                {
                    sender_id: otherUserId,
                    receiver_id: userId
                }
            ]
        },
        limit: pageSize,
        offset: pageSize * lastMessageId,
        include: [
            {model: models.users, as: 'sender'},
            {model: models.users, as: 'receiver'}
        ],
        order: [['id', 'DESC']]
    });
    messages.map(m => m.toJSON());
    return messages;
};
