
const path = require('path');
const {
	body
} = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre').bail()
    .isLength({ min: 2 })
    .withMessage('Tu nombre debe tener al menos dos caracteres')
	.matches('^[A-ZÁÉÍÓÚÑ ]+$', 'i').withMessage('Tu nombre sólo puede contener letras'),
	body('nick').notEmpty().withMessage('Tienes que escribir un nickname o alias'),
	body('email')
	.notEmpty().withMessage('Tienes que escribir un correo electrónico')
	.bail()
	.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body("password")
	.notEmpty()
	.withMessage("Debes completar el campo de Password").bail()
	.isLength({
		min: 8
	})
	.withMessage("Debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres")
	.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, )
	.withMessage("Debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres"),
	body('country').notEmpty().withMessage('Tienes que elegir un país'),

	body('image').custom((value, { req }) => {
		let file = req.file;
		let extensiones = ['.jpg', '.jpeg', '.png', '.gif'];
  
	  if (!file) {
		// throw new Error("Tienes que subir una imagen")
	  } else {
		let imageExt = path.extname(file.originalname)
		if (!extensiones.includes(imageExt)) {
		  throw new Error(
			`Las extensiones permitidas son:  ${extensiones.join(',')}`,
		  )
		}
	  }
	  return true
	}),

];