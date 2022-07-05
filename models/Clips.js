module.exports = (sequelize, DataTypes) => {
    const Clips = sequelize.define("Clips", {
        videoSource: {
            type: DataTypes.STRING,
            allowNull: false
        },
        videoURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rank: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Clips;
}