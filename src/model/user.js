module.exports = (sequelize, DataTypes, Model) => {

class User extends Model {}

    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_updated: {
            type: DataTypes.DATE
        },
        
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'users' // We need to choose the model name
    });
    return User;
}