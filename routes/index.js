const express = require('express')
const router = express.Router()

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');

/**
 * @description ROUTES REDIRECTION FOR ALL INDEX URL
 */
router.route('/')
    .get((req, res, next) => {
        res.sendJson(200, "You can register now")
    })


module.exports = router