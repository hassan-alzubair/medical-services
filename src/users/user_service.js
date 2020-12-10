const userRepo = require('./user_repository');
const UserRoles = require('../common/constants').UserRoles;
const Errors = require('../common/exceptions');

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

exports.getDoctors = (pageIndex, pageSize) => {
    return userRepo.getUsers(UserRoles.DOCTOR, pageIndex, pageSize);
};

exports.getNurses = (pageIndex = 0, pageSize = 10) => {
    return userRepo.getUsers(UserRoles.NURSE, pageIndex, pageSize);
};

exports.updateProfile = async (userId, roleId, data) => {
    let user = await userRepo.findUser(userId, null);
    if (!user)
        throw new Errors.InvalidInputException();

    await userRepo.updateUser(userId, data);
    return userRepo.findUser(userId, null);
};

function validField(field) {
    return !(field === null || field === undefined || field + '' === '');
}
