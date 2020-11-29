const USER = require('../config/db.connection').USER
const POST = require('../config/db.connection').POST
const COMMENT = require('../config/db.connection').COMMENT
const userroles = require('../model/userroles');
const APIError = require('../utils/APIError');
const { removeFields, toString } = require('../utils/helper');



exports.all = async (req, res, next) => {
    try {
        const _project = '-isDeleted -createdAt -updatedAt -deletedAt -deletedBy';
        const comments = await COMMENT.findAll({
            where: { postid: req.params.postid, isDeleted: false }, include: [{
                model: USER,
                attributes: ['id', 'FirstName', 'LastName', 'email']
            }, {
                model: POST,
                attributes: ['id', 'title', 'description', 'userId']
            }]
        }, _project)
    } catch (error) { next(error) }
}




exports.store = async (req, res, next) => {
    try {
        const post = await POST.findOne({ where: { id: req.params.postid, isDeleted: false } })
        if (post) {
            req.body.postId = post.id
            req.body.userId = req.user.id
            const result = await COMMENT.create(req.body)
            return res.sendJson(200, removeFields(comment.toObject(), 'user'));
        } else {
            return res.sendJson(404, 'No Post availale for this post id');
        }
    } catch (error) { next(error) }
}





exports.show = async (req, res, next) => {
    try {
        const post = await POST.findOne({ where: { id: req.params.postid, isDeleted: false } })
        if (post) {
            const comment = await COMMENT.findOne({
                where: { id: req.params.commentid, isDeleted: false }, include: [{
                    model: USER,
                    attributes: ['id', 'FirstName', 'LastName', 'email']
                }, {
                    model: POST,
                    attributes: ['id', 'title', 'description', 'userId']
                }]
            })
            return res.sendJson(200, removeFields(comment.toObject(), 'user'));
        } else {
            return res.sendJson(404, 'No Post availale for this post id');
        }
    } catch (error) { next(error) }
}




exports.update = async (req, res, next) => {
    try {
        const post = await POST.findOne({ where: { id: req.params.postid, isDeleted: false } })
        if (post) {
            req.body.postId = post.id
            const result = await COMMENT.update(req.body, { where: { id: req.params.commentid } })
            return res.sendJson(200, removeFields(comment.toObject(), 'user'));
        } else {
            return res.sendJson(404, 'No Post availale for this post id');
        }
    } catch (error) { next(error) }
}




exports.destroy = async (req, res, next) => {
    try {
        const user = req.user
        const comment = await COMMENT.findOne({ where: { id: req.params.commentid, isDeleted: false } })
        const post = await POST.findOne({ where: { id: comment.postId, isDeleted: false } })

        // @todo ROLES FOR ADMIN CONDITION BAAKI HAI
        if (user.id.toString() !== post.userId.toString() && user.id.toString() !== comment.userId.toString()) {
            throw new APIError({ status: 403, message: `You don't have sufficient access permission to delete this comment!` });
        }
        comment.deletedAt = Date.now()
        await COMMENT.update({ isDeleted: true, deletedBy: user.id, deletedAt: Date.now() }, { where: { id: req.params.commentid } })
        return res.sendJson(200, removeFields(comment.toObject(), 'user'));

    } catch (error) { next(error) }
}

