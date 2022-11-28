const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('nick').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('country').notEmpty().withMessage('Tienes que elegir un país'),

]