const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productController');
const validations = require('../middlewares/validation');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/products')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})

router.get('/productCart', productController.productCart)
/*** Traer un producto por ID */
router.get('/productDetail/:id', productController.productDetail); 

/*** Crear prodcuto */ 
router.get('/createProduct', productController.create); 
router.post('/', upload.single('imagen'), validations, productController.store);


/*** Editar producto */
router.get('/editProduct/:id', productController.edit); 
router.patch('/editProduct/:id', upload.any(), productController.update); 

// /*** Eliminar un producto */

router.delete('/delete/:id', productController.destroy); 

module.exports = router;