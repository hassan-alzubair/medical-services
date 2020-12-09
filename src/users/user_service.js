const userRepo = require('./user_repository');
const UserRoles = require('../common/constants').UserRoles;

exports.createUser = async (mobileNumber, roleId) => {
    let user = await userRepo.createUser(mobileNumber, roleId);
    if (user.role_id === UserRoles.USER) { // auto activate for normal users
        await userRepo.activateUser(user.id);
        user = await userRepo.findUser(user.id, null);
    }
    return user;
};

exports.findUser = (userId, mobileNumber) => {
    return userRepo.findUser(userId, mobileNumber);
};
