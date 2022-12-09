
const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
   home: (req, res) => {
         db.Products.findAll()
            .then(products => {
               res.render('index', {
                  products,
                  toThousand
               })
            })
      }
   }


module.exports = mainController;