const models = require('../../models/index');
const User = models.users;

exports.findByMobile = async (mobileNumber) => {
    let result = await User.findOne({
        where: {
            mobile_number: mobileNumber
        }
    });
    if (result) {
        result = result.toJSON();
    } else {
        result = null;
    }
    return result;
};

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

exports.findById = async (userId) => {
    let result = await User.findOne({
        where: {
            id: userId
        }
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
