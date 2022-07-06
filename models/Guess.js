module.exports = (sequelize, DataTypes) => {
    const Guess = sequelize.define("Guess", {
        clipId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rank: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Guess;
}