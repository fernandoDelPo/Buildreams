
const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController')

/* Ruta registro */
router.get('/register', userController.register)
router.get('/login', userController.login)
router.post('/login', (req,res)=>{
    res.send('Estás logueado');
});
/*Ruta de edicion de producto*/
router.get('/profile', userRoute, userController.profile);


module.exports = router;