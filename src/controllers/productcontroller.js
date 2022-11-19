const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

   productCart: (req, res) => {
   res.render('productCart', {})
   },

   /* Raíz - Mostarar todos los productos*/

   index: (req, res) => {
      res.render('products', {
         products,
         toThousand
      })
   },

   /* Detalle - Detalle de un producto*/

   productDetail: (req, res) => {
      let idproduct = req.params.id;
      let product = products.find(product => product.id == idproduct);
      res.render('productDetail', {
         product,
         toThousand
      });
   },


   //-----------Get y post para crear producto------//


   /* Create - Formulario para crear*/

   create: (req, res) => {
      res.render('product-create-form')
      console.log(req.cookies.color);
   },

   /* Create -  Método para almacenar */

   store: (req, res) => {

      const errors = validationResult(req);

      /* res.cookie('color','rojo') */

      console.log(errors.errors);

      if (!errors.isEmpty()) {
         return res.render('produc-create-form', { errors: errors.mapped(), old: req.body })

      } else {

         let imagen
         if (req.file != undefined) {
            imagen = req.file.filename
         } else {
            imagen = 'default-image.png'
         }

         let newProduct = {
            id: newProduct.id,
            ...req.body,
            imagen
         };

         let productsNews = products.map(product => {
            if (product.id == productToEdit.id) {
               return product = {...productToEdit};
            }
            return product;
         })

         fs.writeFileSync(productsFilePath, JSON.stringify(productsNews, null, ' '));
         res.redirect('/');
      }
   },

   /* Delete - Eliminar un producto de la base de datos */

   destroy: (req, res) => {

      let id = req.params.id;

      let finalProducts = products.filter(product => product.id != id)

      fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
      res.redirect('/');
   }

}

module.exports = controller;
