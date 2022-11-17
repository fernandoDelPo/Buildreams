const fs = require('fs');
const path = require('path');
const {
   validationResult
} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productController = {
   productCart: (req, res) => {
      res.render('productCart', {})
   },

   productDetail: (req, res) => {
      let idproduct = req.params.id;
      let product = products.find(product => product.id == idproduct);
      res.render('productDetail', {
         product,
         products
      });
   },


   //-----------Get y post para crear producto------//
   create: (req, res) => {

      res.render('create-product-form')

      console.log('estás en el formulario')

   },

   // Producto nuevo ------------------------------------//
   store: (req, res) => {

      //    const errors = validationResult(req);

      //  console.log(errors.errors);

      //  if (!errors.isEmpty()) {
      //        return res.render('create-product-form', { errors: errors.mapped(), old: req.body })

      //  }else{

      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
         console.log(resultValidation.errors)
         return res.render('create-product-form', {
            errors: resultValidation.mapped(),
            oldData: req.body
         });
      } else {

         let imagen
         if (req.file != undefined) {
            imagen = req.file.filename
         } else {
            imagen = 'default-image.png'
         }

         let newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            imagen,
            if(enOferta = 'Sin Descuento'){
               enOferta = false
            }

         };
         console.log(req.body);

         let productsNews = [...products, newProduct]
         fs.writeFileSync(productsFilePath, JSON.stringify(productsNews, null, ' '));
         console.log(productsNews)
         console.log('creaste un producto');

         res.redirect('/');
      }
      //}

   },

   edit: (req, res) => {
      let idProduct = req.params.id
      let productEdit = products.find(product => product.id == idProduct)
      res.render('editProduct', {
         productEdit
      })

   },

   update: (req, res) => {

      let id = req.params.id;
      let productToEdit = products.find(product => product.id == id)

      let imagen
      if (req.file != undefined) {
         imagen = req.file.filename
      } else {
         imagen = 'default-image.png'
      }



      productToEdit = {
         id: productToEdit.id,
         ...req.body,
         imagen: imagen,

      }



      let newProducts = products.map(product => {

         if (product.id == productToEdit.id) {

            return product = {
               ...productToEdit
            };

         }

         return product;
      })

      console.log(newProducts)

      fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
      res.redirect('/');

   },

   destroy: (req, res) => {

      let id = req.params.id;

      let newProducts = products.filter(product => product.id != id)

      fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
       
      res.redirect('/');
   }

}

module.exports = productController;