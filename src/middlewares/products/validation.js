const {
    check
} = require('express-validator');

const path = require('path');


const validationCreate = [

    check('nombre').notEmpty().withMessage('Debes ingresar el nombre').bail().isString()
    .withMessage('Debe ser un campo alfanumerico').bail()
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener dos o más caracteres '),
    check('marca').notEmpty().withMessage('Debes ingresar la marca').bail().isString().withMessage('Debe ser un campo alfanumerico').bail(),
    check('precio').notEmpty().withMessage('Debes indicar el precio').bail().isNumeric().withMessage('Debe ser un campo numerico').bail(),
    check('stock').notEmpty().withMessage('Debes indicar la cantidad disponible').bail().isNumeric().withMessage('Debe ser un campo numerico').bail(),
    check('color').notEmpty().withMessage('Debes elegir un color').bail().isString().withMessage('Debe ser un campo alfanumerico').bail(),
    check('descuento').notEmpty().withMessage('Debes seleccionar una opción').bail(),
    check('categoria_id').notEmpty().withMessage('Debes seleccionar una categoría').bail(),
    check('descripcion').notEmpty().withMessage('No puede estar vacio').bail().isLength({
        min: 20,
        max: 300,
    }).withMessage('Debe tener entre 20 y 300 caracteres').bail(),
    check('imagen').custom((value, {
        req
    }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (!file) {

            // throw new Error('Tienes que subir una imagen');

        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
]

module.exports = validationCreate