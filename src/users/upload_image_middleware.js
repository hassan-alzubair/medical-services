const multer = require('multer');
const fs = require('fs');
const config = require('../../config/config');
const {v4: uuidv4} = require('uuid');

exports.uploadAvatar = (req, res, next) => {
    const path = config.IMAGES_STORAGE_PATH;

    fs.existsSync(path) || fs.mkdirSync(path);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path);
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '.jpeg');
        }
    });
    const upload = multer({storage: storage}).single('avatar');
    upload(req, res, function (err) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        }
        next();
    });
};
