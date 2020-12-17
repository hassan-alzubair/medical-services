const request = require('request');
const config = require('../../config/config');

exports.pushNotification = function (receiver, data) {
    if (receiver === undefined || receiver === '' || receiver === null)
        return Promise.reject("receiver is not valid");

    console.log(`Sending FCM notification to: ${receiver}, data ${JSON.stringify(data)}`);

    let key = config.FCM_SERVER_KEY;
    let receivers = [receiver];

    const options = {
        method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + key
        },
        body: {
            "registration_ids": receivers,
            "data": data,
            "priority": "high"
        },
        json: true
    };

    return new Promise((resolve, reject) => {
        request(options, function (err, response, body) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            console.log(body);
            resolve(response);
        });
    });
};
