
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')
const userController = require('../controllers/usercontroller');
const validations = require('../middlewares/users/authRegister');
const guestRoute = require('../middlewares/auth/guestRoute');
const authMiddleware = require('../middlewares/auth/authMiddleware');
const authRegister = require('../middlewares/users/authRegister');
const authEditProfile = require('../middlewares/users/authUserEditProfile');
const validatedLog = require('../middlewares/users/validatedLog');



let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './public/images/avatars')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage});

router.get('/list', userController.list);

router.get('/register', guestRoute, validations,  userController.register);

router.post('/', guestRoute, upload.single('image'),  validations,  userController.store);

router.get('/login',guestRoute, userController.login);
router.post('/login',  validatedLog, userController.authenticate);

router.get('/profile', authMiddleware, userController.profile);

router.get('/edit/:id', userController.editProfile);
router.put('/edit/:id', upload.single('image'), authEditProfile, userController.UpdateProfile);

router.get('/edit2/:id', userController.editProfile2);
router.patch('/edit2/:id', userController.UpdatePassword);

router.delete('/delete/:id', userController.delete);

router.get('/logout/', userController.logout);

module.exports = router;