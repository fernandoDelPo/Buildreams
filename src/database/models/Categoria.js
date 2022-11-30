module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorias';
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
        tableName: 'categorias',
        timestamps: false
    };

    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Products, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "products", // El nombre del modelo pero en plural
            foreignKey: "categoria_id"
        })
    }

    return Categoria
}