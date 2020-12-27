const models = require('../../models');
const Op = require('sequelize').Op;
const sequelize = models.sequelize;
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
            { model: models.users, as: 'sender' },
            { model: models.users, as: 'receiver' }
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
            { model: models.users, as: 'sender' },
            { model: models.users, as: 'receiver' }
        ],
        order: [['id', 'DESC']]
    });
    messages.map(m => m.toJSON());
    return messages;
};

exports.getLatestMessages = async (userId, pageSize, pageNumber) => {
    userId = Number(userId);
    pageSize = Number(pageSize);
    pageNumber = Number(pageNumber);

    let latestMessagesIds = await Message.findAll({
        attributes: [[sequelize.fn("max", sequelize.col('id')), 'id']],
        group: [
            sequelize.fn("least", sequelize.col("sender_id"), sequelize.col("receiver_id")),
            sequelize.fn("greatest", sequelize.col("sender_id"), sequelize.col("receiver_id")),
        ],
        where: {
            [Op.or]: [
                { sender_id: userId },
                { receiver_id: userId }
            ]
        },
        raw: true,
        offset: pageSize * pageNumber,
        limit: pageSize,
        order: [['id', 'DESC']]
    });

    latestMessagesIds = latestMessagesIds.map(id => id.id);

    let messages = await Message.findAll({
        where: {
            id: {
                [Op.in]: latestMessagesIds
            }
        },
        include: [
            { model: models.users, as: 'sender' },
            { model: models.users, as: 'receiver' }
        ],
        order: [['id', 'DESC']]
    });
    messages = messages.map(message => message.toJSON());
    return messages;
};

exports.markMessagesAsReadWithUser = async (userId, otherUserId) => {
    await Message.update({
        read_by_sender: true
    }, {
        where: {
            sender_id: userId,
            receiver_id: otherUserId
        }
    });

    await Message.update({
        read_by_receiver: true
    }, {
        where: {
            receiver_id: userId,
            sender_id: otherUserId
        }
    });

    return Promise.resolve();
};