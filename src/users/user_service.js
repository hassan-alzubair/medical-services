const userDao = require('./user_dao');
const UserRoles = require('../common/constants').UserRoles;
const Errors = require('../common/exceptions');

exports.createUser = async (mobileNumber, roleId) => {
    let user = await userDao.createUser(mobileNumber, roleId);
    if (user.role_id === UserRoles.USER) { // auto activate for normal users
        await userDao.activateUser(user.id);
        user = await userDao.findUser(user.id, null);
    }
    return user;
};

exports.findUser = (userId, mobileNumber) => {
    return userDao.findUser(userId, mobileNumber);
};

exports.getDoctors = (pageIndex, pageSize) => {
    return userDao.getUsers(UserRoles.DOCTOR, pageIndex, pageSize);
};

exports.getNurses = (pageIndex = 0, pageSize = 10) => {
    return userDao.getUsers(UserRoles.NURSE, pageIndex, pageSize);
};

exports.updateProfile = async (userId, roleId, data) => {
    let user = await userDao.findUser(userId, null);
    if (!user)
        throw new Errors.InvalidInputException();

    await userDao.updateUser(userId, data);
    return userDao.findUser(userId, null);
};

function validField(field) {
    return !(field === null || field === undefined || field + '' === '');
}
