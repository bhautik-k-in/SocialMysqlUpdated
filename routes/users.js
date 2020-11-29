const express = require('express');
const router = express.Router();
const userControl = require('../controllers/users')
const { validate } = require('express-validation')
const { login, register } = require('../validations/user')


/**
 * @description LOGIN USER ROUTE
 */
router.route('/')
  .post(validate(login), userControl.login)



/**
 * @description REGISTER USER ROUTE
 */
router.route('/r')
  .post(validate(register), userControl.register)


module.exports = router;
