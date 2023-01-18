const express = require('express');
const router = express.Router();
const categoriaApi = require('../../controllers/Api/categoriaApi');

//Rutas
//Listado de todos los generos
router.get('/', categoriaApi.list);
//Detalle del genero
router.get('/:id', categoriaApi.detail);
//Películas por genero
// router.get('/:id/category', categoriaApi.genreMovies);

module.exports = router;