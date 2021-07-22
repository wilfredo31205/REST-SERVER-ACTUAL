
const { Router } = require('express'); 
const { check }  = require('express-validator');
const { login, googleSignin } = require('../Controllers/auth');
const { ValidarCampos } = require('../middlewares/Validar-Campos');


const router = Router();

router.post('/login',[


    check('Correo', 'El Correo es obligatorio').isEmail(),
    
    check('Password', 'La contraseña es obligatoria').not().isEmpty(),



ValidarCampos,

] ,login );




router.post('/google',[ // ruta de autenticacion por google  

    
    check('id_token', 'El _id token es necesario ').not().isEmpty(),



ValidarCampos

] ,googleSignin );






module.exports = router;  