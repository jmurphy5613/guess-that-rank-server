module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Users;
}