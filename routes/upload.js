
const { Router } = require('express'); 
const { check }  = require('express-validator');
const { cargarArchivos } = require('../Controllers/upload');

const { ValidarCampos } = require('../middlewares/Validar-Campos');


const router = Router();




router.post( '/', cargarArchivos) // el / significa es donde sea que mi servidor defina esta ruta 





module.exports = router;  