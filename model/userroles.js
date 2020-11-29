module.exports = (sequelize, DataTypes) => {
    const userroleSchema = sequelize.define('userroles', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
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
    return userroleSchema
}