module.exports = (sequelize, DataTypes) => {
    const roleSchema = sequelize.define('roles', {
        name: {
            type: DataTypes.STRING
        }
    })
    return roleSchema
}