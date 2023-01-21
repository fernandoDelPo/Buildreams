const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { QueryTypes } = require("sequelize");


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Products = db.Products;
const Category = db.Category;
const Users = db.Users;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const categoriaApi = {

    list: async (req, res) => {
        //listado de categorias | el cb debe ser asíncrono para usar raw queries
   
        const countBy = await sequelize.query(
          "SELECT Category.nombre, COUNT(Products.categoria_id) AS quantity FROM `Category` INNER JOIN `Products` ON Category.id = Products.categoria_id GROUP BY Category.nombre",
          {
            type: QueryTypes.SELECT,
          }
        );
        db.Category.findAll({
          include: ['products'],
        })
          .then((categorias) => {
            categorias.forEach(category => {
                category.dataValues.detail = `http://localhost:3030/api/categorias/${category.dataValues.id}`
                
            });
            
    
    
            // Creo un array que contendrá a cada usuario
            // let datos = [];
            // dataSet(products, datos);
            //se pasan los datos finales al objeto para la respuesta
            return res.json({
              status: 200,
              countBy: countBy, //se usa la consulta de la raw query
              categorias: categorias,
            });
          })
          .catch((error) => res.send(error));
          
      },



    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: genre.length,
                        url: '/api/genre/:id'
                    },
                    data: genre
                }
                res.json(respuesta);
            });
    },

    'categoryProduct': (req, res) => {
        db.Category.findByPk(req.params.id, {
            include: ['products']
        })
            .then(category => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: category.length,
                        url: '/api/categorias/:id/products'
                    },
                    data: category
                }
                res.json(respuesta);
            });
    }
}

module.exports = categoriaApi;