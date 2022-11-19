
const express = require('express');
const router = express.Router();
const path = require('path');
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/authRegister');
const userController = require('../controllers/usercontroller');
const guestRoute = require('../middlewares/guestRoute');
const auth = require('../middlewares/auth');
const userRoute = require('../middlewares/userRoute');

/* Ruta registro, faltan agregar más*/
router.get('/register', guestRoute, userController.register);

router.post('/', guestRoute, uploadFile.single('image'),  validations,  userController.store);

router.get('/login',guestRoute,userController.login)
router.post('/login',guestRoute, auth, userController.authenticate)


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