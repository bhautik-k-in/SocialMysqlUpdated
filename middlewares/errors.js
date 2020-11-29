const { ValidationError } = require("express-validation");
const APIError = require('../utils/APIError');


/**
* Get validation error message
*/
const getErrorMessages = (error) => {
    error = error.details;
    if (error.params) return error.params[0].message;
    else if (error.query) return error.query[0].message;
    else if (error.body) return error.body[0].message;
}

/**
* Error handler. Send stacktrace only during development
*/
exports.handler = (err, req, res, next) => {
    let message = err.message || "Something went wrong. Please try again later.";
    if (!err.isPublic) {
        err.status = 500;
        message = "Something went wrong. Please try again later.";
    }
    if (err.stack) console.log(err.stack);
    if (err.errors) console.log(err.errors);

    return res.sendJson(err.status, message);
};

/**
* If error is not an instanceOf APIError, convert it.
*/
exports.converter = (err, req, res, next) => {
    let convertedError = err;
    if (err instanceof ValidationError) {
        convertedError = new APIError({ status: 422, message: getErrorMessages(err) });
    } else if (!(err instanceof APIError)) {
        convertedError = new APIError({ status: err.status, message: err.message, stack: err.stack });
    }
    return this.handler(convertedError, req, res);
};

/**
* Catch 404 and forward to error handler
*/
exports.notFound = (req, res, next) => {
    const err = new APIError({ message: 'Not found', status: 404 });
    return this.handler(err, req, res);
};