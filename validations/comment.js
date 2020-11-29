const Joi = require('joi')
const APIError = require('../utils/APIError')
const JoiObjectId = require('../utils/joi-objectid')(Joi)
const COMMENT = require('../config/db.connection').COMMENT

exports.commentall = {
    params: Joi.object({
        postid: JoiObjectId().required(),
    })
}

exports.commentshow = {
    params: Joi.object({
        postid: JoiObjectId().required(),
        commentid: JoiObjectId().required()
    })
}

exports.commentstore = {
    params: Joi.object({
        postid: JoiObjectId().required().trim(),
    }),
    body: Joi.object({
        message: Joi.string().required().trim(),
    })
}

exports.commentupdate = {
    params: Joi.object({
        commentid: JoiObjectId().required(),
        postid: JoiObjectId().required()
    }),
    body: Joi.object({
        message: Joi.string().required().trim(),
    }).required().not({})
}

exports.commentdestroy = {
    params: Joi.object({
        commentid: JoiObjectId().required(),
        postid: JoiObjectId().required()
    })
}


exports.commentisExists = async (req, res, next) => {
    try {
        const _id = req.params.commentid;
        const count = await COMMENT.findOne({ where: { _id, isDeleted: false } });
        if (!count) throw new APIError({ status: 404, message: "Record is not available for this id" });
        next();
    }
    catch (err) { next(err); }
}