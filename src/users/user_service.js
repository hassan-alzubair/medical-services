const userDao = require('./user_dao');
const UserRoles = require('../common/constants').UserRoles;
const Errors = require('../common/exceptions');

exports.createUser = async (mobileNumber, roleId) => {
    let user = await userDao.createUser(mobileNumber, roleId);
    if (user.role_id === UserRoles.USER || user.role_id === UserRoles.ADMIN) { // auto activate for users/admins
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

exports.updateFCMToken = (userId, token) => {
    if (!validField(token))
        throw new Errors.InvalidInputException('token is invalid');
    return userDao.updateUser(userId, {
        fcm_token: token
    });
};

exports.getUserFcmToken = (userId) => {
    return userDao.getUserFcmToken(userId);
};

exports.activateUser = async (userId) => {
    let user = await userDao.findUser(userId, null);
    if (!user)
        throw new Errors.InvalidInputException();
    await userDao.activateUser(userId);
    return userDao.findUser(userId);
};

exports.getUsersSummary = async () => {
    let result = {};

    let newRequests = await userDao.getSum([UserRoles.DOCTOR, UserRoles.NURSE], false);
    let totalDoctors = await userDao.getSum(UserRoles.DOCTOR, true);
    let totalNurses = await userDao.getSum(UserRoles.NURSE, true);
    let totalUsers = await userDao.getSum(UserRoles.USER, true);

    result.new_registration_requests = newRequests;
    result.total_doctors = totalDoctors;
    result.total_nurses = totalNurses;
    result.total_users = totalUsers;

    return result;
};

function validField(field) {
    return !(field === null || field === undefined || field + '' === '');
}