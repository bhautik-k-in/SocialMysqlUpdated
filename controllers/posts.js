const USER = require('../config/db.connection').USER
const POST = require('../config/db.connection').POST
const COMMENT = require('../config/db.connection').COMMENT

const { removeFields } = require('../utils/helper')

exports.all = async (req, res, next) => {
    try {
        const posts = await POST.findAll({
            where: { isDeleted: false }, include: [{
                model: USER,
                attributes: ['id', 'FirstName', 'LastName', 'email'],
                where: {
                    isDeleted: false
                },
            }, {
                model: COMMENT,
                attributes: ['id', 'message', 'userId'],
                where: {
                    isDeleted: false
                },
            }]
        })
        return res.sendJson(posts)
    } catch (error) { next(error) }
}





exports.store = async (req, res, next) => {
    try {
        const result = await POST.create(req.body)
        return res.sendJson(200, removeFields(post.toObject(), ['user', 'comments']));
    } catch (error) { next(error) }

}





exports.show = async (req, res, next) => {
    try {
        const result = await POST.findOne({
            where: { id: req.params.id, isDeleted: false }, include: [{
                model: USER,
                attributes: ['id', 'FirstName', 'LastName', 'email'],
                where: {
                    isDeleted: false
                },
            }, {
                model: COMMENT,
                attributes: ['id', 'message', 'userId'],
                where: {
                    isDeleted: false
                },
            }]
        })
        return res.sendJson(result)
    } catch (error) { next(error) }
}






exports.update = async (req, res, next) => {
    try {
        const post = await POST.findOne({ where: { id: req.params.id, isDeleted: false } })
        if (post && post.userId == req.body._id) {
            const result = await POST.update(req.body, { where: { id: result.id } })
            return res.sendJson(200, removeFields(result.toObject(), ['user', 'comments']));
        } else {
            res.sendJson(500, { message: 'Post is not updated' })
        }
    } catch (error) { next(error) }
}




exports.destroy = async (req, res, next) => {
    try {
        const post = await POST.findOne({ where: { id: req.params.id, isDeleted: false } })
        if (post && post.userId == req.user.id) {
            const result = await POST.update({ isDeleted: true, deletedBy: req.user.id, deletedAt: Date.now() }, { where: { id: req.params.id } })
            return res.sendJson(200, 'Post Deleted Successfully.');
        } else {
            res.sendJson(500, { message: 'Post is not deleted' })
        }
    } catch (error) { next(error) }
}

