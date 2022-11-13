
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')

const userController = require('../controllers/userController');
//const guestRoute = require('../middlewares/guestRoute');
//const userRoute = require('../middlewares/userRoute');

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/users')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage});

/* Ruta registro, faltan agregar más*/
router.get('/register', userController.register)
router.get('/login', userController.login)
router.post('/login', (req,res)=>{
    res.send('Estás logueado');
});
/*Ruta de edicion del usuario*/
router.get('/profile', userController.profile);


module.exports = router;

//router.get('/register',guestRoute, usercontroller.register)
//router.get('/profile', guestRoute, usercontroller.editProfile)
//router.post('/profile',guestRoute,upload.single('image'), usercontroller.Profile);
//router.get('/login',guestRoute, usercontroller.login)
//hacer el post de formulario de login
//router.post('/login',guestRoute,usercontroller.authenticate)

//logout
//router.post('/logout',userRoute,usercontroller.logout)