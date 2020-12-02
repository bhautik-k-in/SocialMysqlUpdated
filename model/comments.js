const { POST } = require("../config/db.connection")

module.exports = (sequelize, DataTypes) => {
    const commentsSchema = sequelize.define('comments', {
        message: {
            type: DataTypes.TEXT,
            required: true,
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
        hooks: {
            beforeCreate: async function (comment, done) {
                if (!comment.id) { done(); }

                const result = await POST.findOne({ where: { id: comment.id, isDelete: false } })
                if (result) {
                    done(new APIError({ status: 422, message: 'Invaild post. Please provide a valid post' }))
                } else { done() }
            },
            beforeUpdate: async function (comment, done) {
                if (!comment.id) { done(); next() }

                const result = await POST.findOne({ where: { id: comment.id, isDelete: false } })
                if (result) {
                    done(new APIError({ status: 422, message: 'Invaild post. Please provide a valid post' }))
                } else { done() }
            },

        }
    })
    return commentsSchema
}