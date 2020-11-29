const { secretKeys } = require('../config/index')
const jwt = require('jsonwebtoken')


/**
 * 
 * @param {*} json CONVERT JSON OBJECT TO JAVA SCRIPT OBJECT
 */
exports.toObject = (json) => JSON.parse(JSON.stringify(json))


/**
 * 
 * @param {*} obj GENERATE JWT TOKEN
 */
exports.generateJwt = (obj) => jwt.sign(obj, secretKeys.jwt)



/**
 * 
 * @param {*} obj 
 * @param {*} keys 
 * @param {*} defaultFields 
 */
exports.removeFields = (obj, keys, defaultFields = true) => {
    var basicFields = ['createdAt', 'updatedAt', 'deletedAt', 'deletedBy', 'isDeleted']
    keys = typeof keys == 'string' ? [keys] : keys
    if (defaultFields) keys = keys.concat(basicFields)
    keys.forEach((key) => delete obj[key])
    return obj
}