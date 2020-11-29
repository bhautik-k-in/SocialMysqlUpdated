const express = require('express')
const router = express.Router()
const commentControl = require('../controllers/comments')


/**
 * @description ROUTES FOR ADD NEW COMMENT
 *
 */
// router.route('/')
//     .get(commentControl.all)
//     .post(commentControl.store)



// /**
//  * @description ROUTES FOR EDIT / DELETE / FIND ONE COMMENT
//  */
// router.route('/:id')
//     .get(commentControl.show)
//     .put(commentControl.update)
//     .delete(commentControl.destroy)


module.exports = router