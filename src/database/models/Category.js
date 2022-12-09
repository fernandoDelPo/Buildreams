module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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

    };

    let config = {
        tableName: 'category',
        timestamps: false
    };

    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Products, { 
            as: "products", 
            foreignKey: "categoria_id"
        })
    }

    return Categoria
}