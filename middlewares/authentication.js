const passport = require('passport')
const APIError = require('../utils/APIError')

const manageJwt = (req, res, next, roles) => async (err, user, info) => {
    try {
        if (err || info || !user) {
            const error = err || info.message
            throw new APIError({ status: 401, message: error ? error : 'Unauthorized Access' })
        }
        if (roles !== undefined) {
            roles = typeof roles === 'string' ? [roles] : roles
            if (!roles.includes(user.role.name)) {
                throw new APIError({ status: 403, message: "You don't have permission to access this resource" });
            }
        }
        req.user = user
        return next()
    } catch (error) { next(error) }
}


/**
 * 
 * @param {*} roles 
 */
exports.isAuthentic = (roles) => (req, res, next) => {
    passport.authenticate('authentication', { session: false }, manageJwt(req, res, next, roles))(req, res, next)
}

