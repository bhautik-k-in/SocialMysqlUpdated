const express = require("express")
const router = express.Router()

const postControl = require('../controllers/posts')
const commentControl = require('../controllers/comments')

const { validate } = require('express-validation')

const { show, store, update, destroy, isExists } = require('../validations/post')
const { commentall, commentshow, commentstore, commentupdate, commentdestroy, commentisExists } = require('../validations/comment')

const { isAuthentic } = require('../middlewares/authentication')




/**
 * @description FOR ALL COMMENTS OF INDIVIDUAL POST
 */
router.route('/:postid/comments')
    .get(validate(commentall), commentisExists, commentControl.all)
    .post(isAuthentic(['admin', 'user']), validate(commentstore), commentControl.store)


router.route('/:postid/comments/:commentid')
    .get(isAuthentic(['admin', 'user']), validate(commentshow), commentisExists, commentControl.show)
    .put(isAuthentic(['admin', 'user']), validate(commentupdate), commentisExists, commentControl.update)
    .delete(isAuthentic(['admin', 'user']), validate(commentdestroy), commentisExists, commentControl.destroy)


/**
 * @description ROUTES FOR GET ALL POSTS & CREATE NEW POST
 */
router.route('/')
    .get(postControl.all)
    .post(isAuthentic(['admin', 'user']), validate(store), postControl.store)


/**
 *@description ROUTES FOR EDIT / DELETE / GET SINGLE POST
 */
router.route('/:id')
    .get(isAuthentic(['admin', 'user']), validate(show), isExists, postControl.show)
    .put(isAuthentic(['admin', 'user']), validate(update), isExists, postControl.update)
    .delete(isAuthentic(['admin', 'user']), validate(destroy), isExists, postControl.destroy)


module.exports = router