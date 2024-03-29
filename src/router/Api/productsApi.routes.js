// Require's
const express = require("express");
const router = express.Router();
// const uploadImg = require("../../middlewares/multer/multerImg");

// Controller require
const productApi = require("../../controllers/Api/productApi");

// Todos los productos http://localhost:3030/api/products
router.get("/", productApi.list);

// Buscar producto http://localhost:3030/api/products/search?keyword=nike
router.get("/search", productApi.search);

// Crear producto http://localhost:3030/api/products
router.post("/", productApi.store);

// Detalle Producto http://localhost:3030/api/products/:id
router.get("/:id", productApi.productDetail);


// Borrar producto http://localhost:3000/api/products/:id
router.delete("/:id", productApi.delete);

// Checkout cart
router.post("/checkout", productApi.checkout);

module.exports = router;
