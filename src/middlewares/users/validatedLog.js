const { check } = require("express-validator");

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email ")
    .bail()
    .isEmail()
    .withMessage("Por favor, ingresa un email correcto"),
  check("password")
  .notEmpty()
  .withMessage("Debes completar el campo de Password").bail()
  .isLength({ min: 8 })
    .withMessage("Debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres" )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
    .withMessage("Debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres" ),
];
