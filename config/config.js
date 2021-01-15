require('dotenv').config();

exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT;
exports.APP_URL = process.env.APP_URL;
exports.IMAGES_STORAGE_PATH = process.env.IMAGES_STORAGE_PATH;
exports.FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;
exports.SMS_ENABLED = process.env.SMS_ENABLED === 'true' ;
