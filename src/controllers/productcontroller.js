const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

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

       let imagen
       if(req.file != undefined){
          imagen = req.file.filename
       } else {
          imagen = 'default-image.png'
       }
       
       let newProduct = {
          id: products[products.length - 1].id + 1,
          ...req.body,
          imagen

       };
       console.log(req.body);

        let productsNews = [...products, newProduct]
       fs.writeFileSync(productsFilePath, JSON.stringify(productsNews, null, ' '));
       console.log(productsNews)
       console.log('creaste un producto');

       res.redirect('/');
    //}

 },

   edit: (req, res) => {
		let idProduct = req.params.id
		let productEdit = products.find(product => product.id == idProduct)
		res.render('editProduct', {productEdit})
	},

}

module.exports = productController;