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
		res.render('productDetail', { product, products });
	},
	create: (req, res) => {
		res.render('createProducts')
	},
	edit: (req, res) => {
		let idProduct = req.params.id
		let productEdit = products.find(product => product.id == idProduct)
		res.render('editProduct', { productEdit })

	},
	update: (req, res) => {

		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)

		let imagen
        if(req.file != undefined){
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
			console.log(productToEdit.id)
			console.log(product.id)
			if (product.id == productToEdit.id) {
				
				return product = { ...productToEdit };
				
			}
			
			return product;
		})

		console.log(newProducts)

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');

	},
	destroy: (req, res) => {
		let id = req.params.id;
		console.log(id)
	}

}

module.exports = productController;