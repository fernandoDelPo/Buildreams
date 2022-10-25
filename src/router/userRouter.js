
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

module.exports = router;