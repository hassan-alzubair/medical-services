exports.success = (res, obj = null) => {
    if (obj) {
        res.status(200).send(obj);
    } else {
        res.status(200).send();
    }
};

exports.error = (res, error) => {
    res.status(error.status).send({
        code: error.code,
        message: error.message,
    })
};
