
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

/* Requerimiento de controladores */

const userController = require('../controllers/userController')
const userRoute = require('../middlewares/userRoute');
const guestRoute = require('../middlewares/guestRoute');

/* Configuración de multer*/

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/users')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage});

/* Mostrar el formulario para hacer el registro */

router.get('/register', guestRoute, userController.register)

/*hacer envío (post) del formulario de registro*/

router.post('/',guestRoute,upload.single('image'), userController.store)

/* Se muestra el formulario de login*/
router.get('/login', guestRoute, userController.login)

/* Hacemos el envío del formulario de login*/

router.post('/login',guestRoute,userController.authenticate)

/* Cerrar cesión(logout) */

router.post('/logout',userRoute,userController.logout)

router.get('/profile', userRoute, userController.profile);




/*Ruta de edicion del usuario*/
//router.get('/profile', userController.profile);


module.exports = router;

//router.get('/register',guestRoute, usercontroller.register)
//router.get('/profile/edit/:id', guestRoute, usercontroller.editProfile)
//router.put('/profile/update/:id',guestRoute,upload.single('image'), usercontroller.UpdateProfile);
//router.get('/login',guestRoute, usercontroller.login)
//hacer el post de formulario de login
//router.post('/login',guestRoute,usercontroller.authenticate)

//logout
//router.post('/logout',userRoute,usercontroller.logout)