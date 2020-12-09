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

exports.activateUser = (userId) => {
    return User.update({
        activated: true
    }, {
        where: {
            id: userId
        }
    });
};
