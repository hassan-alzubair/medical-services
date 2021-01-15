const rp = require('request-promise');
const config = require('../../config/config');
const username = 'petastartup';
let password = 'petastartup3#**';
const sender = 'BETA StarUP';

const send = async (phoneNumber, message) => {
    console.log(`Send: ${phoneNumber}, message: ${message}`);

    phoneNumber = phoneNumber.replace(/[^\d,]/g, '');
    phoneNumber = phoneNumber.replace("+", "");

    // only send for sudanese numbers
    if (!phoneNumber.match(/^249/g)) {
        return;
    }

    password = encodeURIComponent(password);
    message = encodeURIComponent(message);

    let url = 'http://sms.nilogy.com/app/gateway/gateway.php?sendmessage=1&username=' + username + '&password=' + password + '&numbers=' + phoneNumber + '&sender=' + sender + '&text=' + message;

    if (config.SMS_ENABLED === false){
        console.log('SMS Disabled by config, enable with SMS_ENABLED=true in environment variables');
        return;
    }

    try {
        let response = await rp(url);
        let responseData = JSON.parse(response);
        console.log(`send sms to mobile: ${phoneNumber}, message: ${message}`);
        console.log("================ send Niology response", responseData.success);
        if (responseData.success) {
            return Promise.resolve(response.statusCode);
        } else {
            console.log({error_message: responseData});
            return Promise.reject({error_message: responseData.error});
        }
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
};

exports.send = send;
