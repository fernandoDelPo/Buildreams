const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre').bail()
	.isLength({ min: 2 })
    .withMessage('Tu nombre debe tener dos o más caracteres ')
	.matches('^[A-ZÁÉÍÓÚÑ ]+$', 'i').withMessage('Tu nombre sólo puede contener letras'),
    body('nick').notEmpty().withMessage('Tienes que escribir un nickname'),
	body('country').notEmpty().withMessage('Tienes que elegir un país'),

]