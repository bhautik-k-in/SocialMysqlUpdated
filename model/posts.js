
module.exports = (sequelize, DataTypes) => {
    const postsSchema = sequelize.define('posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            required: true
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
    })
    return postsSchema
}