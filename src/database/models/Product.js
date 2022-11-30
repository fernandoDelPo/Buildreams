module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
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
        marca: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: dataTypes.DECIMAL,
            allowNull: false,
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        color: {
            type: dataTypes.STRING,
        },
        marca: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        categoria_id: {
            type: dataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        descripcion: {
            type: dataTypes.TEXT,
        },
        imagen: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        descuento: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
        Product.belongsTo(models.Categorias, { 
            as: "categorias",
            foreignKey: "categoria_id"
        })


        Product.belongsToMany(models.Users, { 
            as: "users",
            through: 'user_product',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        })
    }

    return Product
}