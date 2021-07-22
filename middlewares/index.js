

const ValidarCampos  = require('../middlewares/Validar-Campos');

const  validarJWT  = require('../middlewares/validar-jwt');
const  validaRoles = require('../middlewares/Validar-roles');




    // este es el archivo index.js en el cual va a hacer referencia a todos mis middlewares personalizador 


module.exports = { 


    ...ValidarCampos,
    ...validarJWT,
    ... validaRoles,



}