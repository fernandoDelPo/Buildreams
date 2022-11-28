
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')
const userController = require('../controllers/usercontroller');
const validations = require('../middlewares/authRegister');
const guestRoute = require('../middlewares/guestRoute');
const authMiddleware = require('../middlewares/authMiddleware');
const authRegister = require('../middlewares/authRegister');
const authEditProfile = require('../middlewares/authUserEditProfile')
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './public/images/avatars')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage});

router.get('/register', guestRoute, userController.register);

router.post('/', guestRoute, upload.single('image'),  validations,  userController.store);

router.get('/login',guestRoute, userController.login);

router.post('/login', userController.authenticate);

router.get('/profile', authMiddleware, userController.profile);

router.get('/edit/:id', userController.editProfile);

router.patch('/edit/:id', userController.UpdateProfile);

router.get('/logout/', userController.logout);

module.exports = router;