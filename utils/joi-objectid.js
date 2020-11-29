const assert = require('assert')
let defaultMessage = 'Valid id'


/**
 * 
 * @param {*} Joi 
 * @param {*} message Custom message for invalid id parameter
 */
module.exports = function joiObjectId(Joi, message) {
    assert(Joi && Joi.object, 'You have to pass Joi as an argument')
    if (message === undefined) message = defaultMessage
    return function objectid() {
        return Joi.string().regex(/^[0-9a-zA-Z]{36}$/, message)
    }
}

