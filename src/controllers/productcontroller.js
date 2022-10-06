const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
   create: (req, res) => {
      res.render('createProducts')
      // console.log(req.cookies.color);
   },
   edit: (req, res) => {
		let idProduct = req.params.id
		let productEdit = products.find(product => product.id == idProduct)
		res.render('editProduct', {productEdit})
	},

}

module.exports = productController;