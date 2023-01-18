let db = require("../../database/models");
const Op = db.Sequelize.Op;

const productApi = {
  list: (req, res) => {
    db.Products.findAll()
      .then((products) => {
        var countHerramientas = 0;
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
          if (products[i].category_id == 1) {
            countHerramientas += 1;
          } else if (products[i].category_id == 2) {
            countCementosCal += 1;
          } else if (products[i].category_id == 3) {
            countAberturas += 1;
          } else if (products[i].category_id == 4) {
            countHierroChapa += 1;
          } else if (products[i].category_id == 5) {
            countLadrillos += 1;
          } else if (products[i].category_id == 6) {
            countAguaGas += 1;
          } else if (products[i].category_id == 7) {
            countInstalaciones += 1;
          } else if (products[i].category_id == 8) {
            countPinturas += 1;
          } else {
            countOtros += 1;
          }
        }

        for (let i = 0; i < products.length; i++) {
          products[i].setDataValue(
            "detail",
            `http://localhost:3030/api/products/${products[i].id}`
          );
        }


        for (let i = 0; i < products.length; i++) {
          products[i].setDataValue(
            "pathImg",
            `http://localhost:3030/images/products/${products[i].imagen}`
          );
        }

        var enOferta = 0;
        products.forEach(product => {
          if (product.enOferta == 1) {
            enOferta += 1;
          }
        });


        let response = {
          products: products,
          countHerramientas: countHerramientas,
          countCementosCal: countCementosCal,
          countAberturas: countAberturas,
          countHierroChapa: countHierroChapa,
          countLadrillos: countLadrillos,
          countAguaGas: countAguaGas,
          countInstalaciones: countInstalaciones,
          countPinturas: countPinturas,
          countOtros: countOtros,
          oferta: enOferta,
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
          data: products,
          status: 200,
        };

        res.status(200).json(response);
      })
      .catch((error) => res.json(error));
  },

  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then(function (productSelected) {
        let response = {
          id: productSelected.id,
          productName: productSelected.productName,
          brand: productSelected.brand,
          description: productSelected.description,
          color: productSelected.color,
          price: productSelected.price,
          size: productSelected.size,
          pathImg: `http://localhost:3030/images/shoes-img/${productSelected.imgen}`,
          status: 200,
        };

        res.status(200).json(response);
      })
      .catch((error) => res.json(error));
  },

  store: (req, res) => {
    db.Product.create(req.body)
      .then((product) => {
        let response = {
          data: product,
          status: 200,
          created: "ok",
        };
        return res.status(200).json(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  delete: (req, res) => {
    db.Product.destroy({
      where: {
        id: parseInt(req.params.id, 10)
      },
    })
      .then(() => {
        return res.json("Product Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  search: (req, res) => {
    db.Product.findAll({
      where: {
        productName: {
          [Op.like]: "%" + req.query.keyword + "%"
        },
      },
    })
      .then((products) => {
        if (products.length > 0) {
          /* Imprime url de la foto para consumir */
          for (let i = 0; i < products.length; i++) {
            products[i].setDataValue(
              "pathImg",
              `http://localhost:3030/images/shoes-img/${products[i].img}`
            );
          }
          res.status(200).json({
            data: products,
            status: 200,
          });
        } else {
          res.status(200).json({
            data: "No existen productos con ese nombre",
            status: 200,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  checkout: async function (req, res) {
    let order = await db.Order.create({
      ...req.body,
      userId: req.session.userLogged.id,
    }, {
      include: db.Order.OrderItems
    });
    res.json({
      ok: true,
      status: 200,
      order: order
    });
  },
};

module.exports = productApi;