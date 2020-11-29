const Sequelize = require('sequelize')
const { dbConfig } = require('./index');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: dbConfig.dialect
})


// EVERYTHING IS AVAILABLE IN ONE OBJECT `DB`
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// MODELS
db.ROLE = require('../model/roles')(sequelize, Sequelize)
db.USER = require('../model/users')(sequelize, Sequelize)
db.POST = require('../model/posts')(sequelize, Sequelize)
db.COMMENT = require('../model/comments')(sequelize, Sequelize)
db.USERROLE = require('../model/userroles')(sequelize, Sequelize)


/**
 * @description RELATIONS BETWEEN MODELS
 */
// COMMENT MODEL RELATIONS
db.COMMENT.belongsTo(db.POST)
db.POST.hasMany(db.COMMENT)
db.COMMENT.belongsTo(db.USER)
db.USER.hasMany(db.COMMENT)

// POST MODEL RELATIONS
db.POST.belongsTo(db.USER)
db.USER.hasMany(db.POST)

// USER AND ROLE MIX UP MODEL RELATIONS WITH ONE ERROR
db.USER.belongsToMany(db.ROLE, { through: 'userroles' })
db.ROLE.belongsToMany(db.USER, { through: 'userroles' })


module.exports = db