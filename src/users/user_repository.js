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

exports.createUser = async (mobileNumber) => {
    let result = await User.create({
        mobile_number: mobileNumber
    });

    if (result) {
        result = result.toJSON();
    } else {
        result = null;
    }
    return result;
};
