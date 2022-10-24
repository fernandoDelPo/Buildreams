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
      res.render('productDetail', {product,products});
   },
   create: (req, res) => {
      res.render('createProducts')
   },
   edit: (req, res) => {
		let idProduct = req.params.id
		let productEdit = products.find(product => product.id == idProduct)
		res.render('editProduct', {productEdit})

	},
   update: (req, res) => {
      let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)
		let image

		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = productToEdit.image
		}

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: image,
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');

   },
   destroy: (req, res) =>{
      let id = req.params.id;
		console.log(id)
   }

}

module.exports = productController;