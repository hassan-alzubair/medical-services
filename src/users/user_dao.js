const models = require('../../models/index');
const User = models.users;

exports.createUser = async (mobileNumber, roleId) => {
    let result = await User.create({
        mobile_number: mobileNumber,
        role_id: roleId
    });

    if (result) {
        result = result.toJSON();
    } else {
        result = null;
    }
    return result;
};

exports.findUser = async (userId, mobileNumber) => {
    let where = {};
    if (userId) {
        where.id = userId
    }
    if (mobileNumber) {
        where.mobile_number = mobileNumber;
    }
    let result = await User.findOne({
        where: where
    });
    if (result) {
        result = result.toJSON();
    } else {
        result = null;
    }
    return result;
};

exports.getUserFcmToken = (userId) => {
    return User.findOne({
        where: { id: userId },
        attributes: ['fcm_token'],
    });
};

exports.activateUser = (userId) => {
    return User.update({
        activated: true
    }, {
        where: {
            id: userId
        }
    });
};

exports.getUsers = async (roleId, activated, pageIndex, pageSize) => {
    pageIndex = Number(pageIndex);
    pageSize = Number(pageSize);

    let where = {};
    if (roleId) {
        roleId = Number(roleId);
        where.role_id = roleId;
    }

    if ((activated !== undefined && activated !== null)) {
        if (activated === 'true')
            activated = true;
        if (activated === 'false')
            activated = false;
        where.activated = activated;
    }

    let results = await User.findAll({
        where: where,
        offset: pageIndex * pageSize,
        limit: pageSize,
        order: [["updated_at", "DESC"]]
    });

    results.map(r => r.toJSON());
    return results;
};

exports.updateUser = (userId, user) => {
    return User.update(user, {
        where: {
            id: userId
        }
    });
};

exports.getSum = (roleId, activated) => {
    return User.count({
        where: {
            role_id: roleId,
            activated: activated
        }
    });
};
