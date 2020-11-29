const Joi = require('joi')

exports.register = {
    body: Joi.object({
        FirstName  : Joi.string().required().max(30).trim(),
        LastName   : Joi.string().required().max(30).trim(),
        email      : Joi.string().required().email().trim().lowercase(),
        password   : Joi.string().required().min(6).max(32).trim()
    })
}

exports.login = {
    body: Joi.object({
        email     : Joi.string().required().email().trim().lowercase(),
        password  : Joi.string().required().min(6).max(32).trim()
    })
}