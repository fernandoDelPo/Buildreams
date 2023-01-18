const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Products = db.Products;
const Category = db.Category;
const Users = db.Users;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const categoriaApi = {
    'list': (req, res) => {
        db.Products.findAll()
            .then((products) => {
                let countHerramientas = 0;
                let countCementosCal = 0;
                let countAberturas = 0;
                let countHierroChapa = 0;
                let countLadrillos = 0;
                let countAguaGas = 0;
                let countInstalaciones = 0;
                let countPinturas = 0;
                let countOtros = 0;

                /* Contador de productos por categoria */
                for (let i = 1; i < products.length; i++) {
                    if (products[i].categoria_id == 1) {
                        countHerramientas = countHerramientas + 1;
                    } else if (products[i].categoria_id == 2) {
                        countCementosCal += 1;
                    } else if (products[i].categoria_id == 3) {
                        countAberturas += 1;
                    } else if (products[i].categoria_id == 4) {
                        countHierroChapa += 1;
                    } else if (products[i].categoria_id == 5) {
                        countLadrillos += 1;
                    } else if (products[i].categoria_id == 6) {
                        countAguaGas += 1;
                    } else if (products[i].categoria_id == 7) {
                        countInstalaciones += 1;
                    } else if (products[i].categoria_id == 8) {
                        countPinturas += 1;
                    } else {
                        countOtros += 1;
                    }
                }

                db.Category.findAll()
                    .then(category => {
                        let respuesta = {

                            countHerramientas: countHerramientas,
                            countCementosCal: countCementosCal,
                            countAberturas: countAberturas,
                            countHierroChapa: countHierroChapa,
                            countLadrillos: countLadrillos,
                            countAguaGas: countAguaGas,
                            countInstalaciones: countInstalaciones,
                            countPinturas: countPinturas,
                            countOtros: countOtros,
                            count: products.length,
                            countByCategory: [{
                                herramientas: countHerramientas,
                            },
                            {
                                cementos: countCementosCal,
                            },
                            {
                                aberturas: countAberturas,
                            },
                            {
                                hierrosChapas: countHierroChapa,
                            },
                            {
                                ladrillos: countLadrillos,
                            },
                            {
                                aguaGas: countAguaGas,
                            },
                            {
                                instalaciones: countInstalaciones,
                            },
                            {
                                pinturas: countPinturas,
                            },
                            {
                                otros: countOtros,
                            },
                            ],
                            meta: {
                                status: 200,
                                total: category.length,
                                url: 'api/categorias'
                            },
                            data: category
                        }
                        res.json(respuesta);
                    })
            }
            )
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