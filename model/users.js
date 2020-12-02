const bcrypt = require('bcryptjs')
const { removeFields } = require('../utils/helper')

// const userModelSchema = (sequelize, DataTypes) => {
//     const usersSchema = sequelize.define('users', {
//         FirstName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         LastName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             isEmail: true
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         isDeleted: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         },
//         deletedBy: {
//             type: DataTypes.INTEGER,
//         },
//         deletedAt: {
//             type: DataTypes.DATE
//         }
//     }, {
//         hooks: {
//             beforeCreate: function (next, done) {
//                 try {
//                     const own = this
//                     const record = await.findOne({ where: { id: own.id, email: self.email, isDeleted: false } })

//                     record ? done(new APIError({ status: 409, message: `"email" already exists` })) : done()
//                     next()
//                 }
//                 catch (err) { done(err); next() }
//             },
//             async function(next) {
//                 const salt = await bcrypt.genSalt(10)
//                 if (!this.isModified('password')) return next()
//                 const hash = await bcrypt.hash(this.password, salt)
//                 this.password = hash
//                 next()
//             }

//         }
//     })

//     return usersSchema
// }

// // userModelSchema.beforeCreate()


// // userModelSchema.beforeCreate()



// // userModelSchema.methods.deleteFields = function (keys, defaultFields = true) {
// //     return removeFields(this.toObject(), keys, defaultFields)
// // }

// // userModelSchema.methods.deleteFields = function (keys, defaultFields = true) {
// //     return removeFields(this.toObject(), keys, defaultFields);
// // };

// // userModelSchema.methods.isValidPassword = async function (password) {
// //     return await bcrypt.compare(password, this.password)
// // }



// module.exports = userModelSchema





module.exports = (sequelize, DataTypes) => {
    const usersSchema = sequelize.define('users', {
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deletedBy: {
            type: DataTypes.INTEGER,
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    }, {
        instanceMethods: {
            deleteFields: function (keys, defaultFields = true) {
                return removeFields(this.toObject(), keys, defaultFields);
            },
            isValidPassword: async function (password) {
                return await bcrypt.compare(password, this.password)
            }
        }
    })


    usersSchema.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
    })


    return usersSchema
}