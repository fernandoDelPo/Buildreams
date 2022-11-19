const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
// router.get('/search', mainController.search); // Para cuando hagamos la funcion de buscar


module.exports = router;