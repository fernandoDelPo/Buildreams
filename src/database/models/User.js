module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        nick: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        User.belongsToMany(models.Products, {
            as: "products",
            through: "user_product",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return User
}