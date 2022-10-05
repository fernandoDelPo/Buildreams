const express = require('express');
const router = express.Router();
const path = require('path')
const productController = require('../controllers/productController');


router.get('/productCart', productController.productCart)
/*** Traer un producto por ID */
router.get('/productDetail/:id', productController.productDetail); 

/*** Crear prodcuto */ 
router.get('/create', productController.create); 
// router.post('/', upload.single('image'),validationCreate, productController.store);



// /*** Editar producto por id ***/ 
// router.get('/edit/:id', productController.edit); 
// router.patch('/edit/:id', upload.any(), productController.update);
 
// /*** Eliminar un producto */

// router.delete('/delete/:id', productController.destroy); 

module.exports = router;