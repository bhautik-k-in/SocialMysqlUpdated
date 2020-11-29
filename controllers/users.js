
const USER = require('../config/db.connection').USER
const ROLE = require('../config/db.connection').ROLE
const USERROLE = require('../config/db.connection').USERROLE
const APIError = require('../utils/APIError')
const passport = require('passport')
const { generateJwt, toObject, removeFields } = require('../utils/helper')

exports.login = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) throw new APIError({ status: 401, message: err ? err.message : 'Unauthorized access' })

            req.login(user, { session: false }, async (err) => {
                if (err) throw new APIError()
                const role = await USERROLE.findOne({ where: { userId: user.id } })
                const body = { id: user.id, firstName: user.FirstName, email: user.email, role: role.name }
                const token = generateJwt({ user: body })
                user = toObject(user)
                user.token = "Bearer " + token
                return res.sendJson(200, { data: user, message: info.message })
            });

        } catch (error) { next(error) }
    })(req, res, next)
}

exports.register = async (req, res, next) => {
    try {
        const payload = req.body
        const role = await ROLE.findOne({ where: { name: 'user' } })
        if (!role) throw new APIError({ message: 'It seems that the system roles are not generated yet' })
        let user = await USER.create(payload)
        await USERROLE.create({ userId: user.id, roleId: role.id })
        const body = { id: user.id, firstname: user.FirstName, email: user.email, role: role.name }
        const token = generateJwt({ user: body })
        user = toObject(user)
        user.token = "Bearer " + token
        return res.sendJson(200, { data: removeFields(user, ['password']), message: "Register Successfully" })
    } catch (error) { next(error) }
}