const Joi = require('joi')
const APIError = require('../utils/APIError')
const JoiObjectId = require('../utils/joi-objectid')(Joi)
const POST = require('../config/db.connection').POST

exports.show = {
    params: Joi.object({
        id: JoiObjectId().required()
    })
}

exports.store = {
    body: Joi.object({
        title: Joi.string().required().trim().replace(/\s\s+/g, ' '),
        description: Joi.string().required()
    })
}

exports.update = {
    params: Joi.object({
        id: JoiObjectId().required()
    }),
    body: Joi.object({
        title: Joi.string().optional().trim().replace(/\s\s+/g, ' '),
        description: Joi.string().optional().trim().replace(/\s\s+/g, ' ')
    }).required().not({})
}

exports.destroy = {
    params: Joi.object({
        id: JoiObjectId().required()
    })
}

exports.isExists = async (req, res, next) => {
    try {
        const _id = req.params.id
        const user = req.user
        const record = await POST.findOne({ where: { id: _id, isDeleted: false } })
        if (!record) throw new APIError({ status: 404, message: 'Record is not available for this id' })
        if (JSON.stringify(record.userId) !== JSON.stringify(user.id) && user.roles.name === 'user') {
            throw new APIError({ status: 403, message: "You don't have permission to access thi resource" })
        }
        next()
    } catch (error) { next(error) }
}