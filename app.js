const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const apiVersion = '/api/v1';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


// app.use(`${apiVersion}/auth`, require('./src/auth/auth_router'));

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
