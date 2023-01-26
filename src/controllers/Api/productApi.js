const { sequelize } = require("../../database/models"); //se requiere sequelize para operaciones con raw queries
let db = require("../../database/models");
const Op = db.Sequelize.Op;
const QueryTypes = db.Sequelize.QueryTypes;

const productApi = {

  list: async (req, res) => {
    //listado de productos | el cb debe ser asíncrono para usar raw queries
    let page = 0;
    let limit = 8;
    req.query.page ? (page = Number(req.query.page) * 8) : (limit = undefined);
    const countBy = await sequelize.query(
      "SELECT Category.nombre, COUNT(Products.categoria_id) AS quantity FROM `Category` INNER JOIN `Products` ON Category.id = Products.categoria_id GROUP BY Category.nombre",
      {
        type: QueryTypes.SELECT,
      }
    );


    //Buscar último registro sin usar .length

    // const lastProductInDb = await sequelize.query(
    //   "SELECT Products.nombre, Products.descripcion, Products.imagen FROM `Products` ORDER BY Products.id DESC LIMIT 1",
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );
    // console.log(lastProductInDb);

    db.Products.findAll({
      include: ['category'],
      offset: page,
      limit: limit,
    })
      .then((products) => {
        products.forEach(producto => {
          producto.dataValues.detail = `http://localhost:3030/api/products/${producto.dataValues.id}`
        });

        var enOferta = 0;
        products.forEach(product => {
          if (product.enOferta == 1) {
            enOferta += 1;
          }
        });

        
        let lastProductInDb = products[products.length - 1]

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

        // Creo un array que contendrá a cada producto
        // let datos = [];
        // dataSet(products, datos);
        //se pasan los datos finales al objeto para la respuesta
        return res.json({
          status: 200,
          lastProductInDb: lastProductInDb,
          enOferta: enOferta,
          count: products.length,
          countByCategory: countBy, //se usa la consulta de la raw query
          products: products,
        });
      })
      .catch((error) => res.send(error));
  },

  
  productDetail: (req, res) => {

    //Obtengo el producto por id
    db.Products.findByPk(req.params.id)
      .then((product) => {

        // Creo el objeto
        let producto = {
          status: 200,
          data: {
            id: product.id,
            nombre: product.nombre,
            include: [{ association: "category" }],
            categoria_id: product.categoria_id,
            precio: product.precio,
            stock: product.stock,
            marca: product.marca,
            enOferta: product.enOferta,
            descripcion: product.descripcion,
            color: product.color,
            imagen: product.imagen,     
            detail: `http://localhost:3030/api/products/${product.id}`,
          },

        };
        res.json(producto);
        
      })
      .catch((error) => {
        // Si hay un error corresponde un status 500
        let errores = {
          status: 500,
          error: error,
        };
        res.json(errores);
      });
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