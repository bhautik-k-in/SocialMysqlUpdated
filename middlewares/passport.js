const passport = require('Passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { secretKeys } = require('../config/index')

const USER = require('../config/db.connection').USER

const localStrategyOpts = { usernameField: 'email', passwordField: 'password' }
const JWTStrategyOpts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: secretKeys.jwt }

const loginLocalStrategy = async (email, password, done) => {
    try {
        let user = await USER.findOne({ where: { email: email, isDeleted: false } })
        if (!user) return done(new Error('Invalid email or password'))

        if (!await user.isValidPassword(password)) return done(new Error('Invalid email or password'))
        return done(null, user.deleteFields(['password'], { message: 'Logged In Successfull' }))
    } catch (error) { return done(error) }
}


const AuthenticateJWTStrategy = async (JWTPayload, done) => {
    try {
        let user = await USER.findOne({ where: { id: JWTPayload.user.id, isDeleted: false } })
        console.log("Authenticate jwt user" + user)
        if (user) { return done(null, user.deleteFields(['password'])) }
        else { return done(new Error('Invalid access token')) }
    } catch (error) { return done(error) }
}

passport.use('login', new LocalStrategy(localStrategyOpts, loginLocalStrategy));

passport.use('authentication', new JWTStrategy(JWTStrategyOpts, AuthenticateJWTStrategy))












// passport.use(
//     new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
//         //match user
//         const user = await USER.findOne({ where: { email: email } })
//         if (!user) return done(new Error('Invalid email or password'))

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) throw new APIError({ message: err })

//             if (isMatch) {
//                 //  return done(null, user);
//                 return done(null, user.deleteFields(['password'], { message: 'Logged In Successfull' }))
//             } else {
//                 return done(new Error('Invalid email or password'))
//             }
//         })

//         //  if (!await user.isValidPassword(password)) return done(new Error('Invalid email or password'))
//         //  return done(null, user.deleteFields(['password'], { message: 'Logged In Successfull' }))
//     }))

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     USER.findOne({ where: { id: id } }).then((err, user) => {
//         done(err, user)
//     })
// })