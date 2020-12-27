const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const apiVersion = '/api/v1';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use('/images', express.static(__dirname + '/images'));
app.use(passport.initialize());
passport.use(require('./src/auth/passport_http_bearer').Strategy);

app.use(`${apiVersion}/auth`, require('./src/auth/auth_router'));
app.use(`${apiVersion}/services`, require('./src/doctors_and_nurses/doctors_and_nurses_router'));
app.use(`${apiVersion}/user`, require('./src/users/user/user_router'));
app.use(`${apiVersion}/messages`, require('./src/messages/messages_router'));
app.use(`${apiVersion}/pharmacies`, require('./src/pharmacies/user/pharmacies_router'));
app.use(`${apiVersion}/dashboard/pharmacies`, require('./src/pharmacies/dashboard/pharmacies_router'));
app.use(`${apiVersion}/dashboard/users`, require('./src/users/dashboard/users_router'));

Error.prototype.code = Error.prototype.code || 500;

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err,
    });
});

module.exports = app;
