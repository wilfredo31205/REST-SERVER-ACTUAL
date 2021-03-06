const { Router } = require('express'); 
const { check }  = require('express-validator');

const { validarJWT, esAdminRole } = require('../middlewares');


const { ValidarCampos } = require('../middlewares/Validar-Campos');


const { ObtenerCategoria, actualizarCategoria, eliminarCategoria} = require('../Controllers/Categorias');


const {obtenerCategoria} = require('../Controllers/Categorias');


const {crearCategoria} = require('../Controllers/Categorias');


const {   existeCategoriaPorId } = require('../helpers/db-Validator');
 



//const {ExisteCategoriaporID } = require('../Controllers/Categorias');




const router = Router();



// Obtener  todas las categorias -publico 

router.get('/',ObtenerCategoria);





// Obtener una categoria por id - publico
router.get('/:id',[ 

    check('id',' No es un id de Mongo ').isMongoId(),

    
    ValidarCampos,

    check('id').custom(existeCategoriaPorId)


],obtenerCategoria);


//  Crear categoria -privado - cualquier persona con un token valido 


//validarJWT, // pasandole el middlware de validar el json web token para verificar que el usuario este registrado en nuestra aplicacion 
router.post('/',  [


    validarJWT,

    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // mandandole al usuario un mensaje de error por si no coloca el nombre



    ValidarCampos, // mandando a llamar el middleware donde contiene los errores 

    


] , crearCategoria) // modelo de categoria


// actualizar un registro por su id 
router.put('/:id',[


    validarJWT,

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     
    check('id').custom(existeCategoriaPorId),

    ValidarCampos





] , actualizarCategoria); 







 // borrar una categoria si solamente es un admin 


router.delete('/:id',[

    validarJWT,

    esAdminRole, // validando con el middlware de esadmiROLE QUE SOLAMENTE SEA EL ADMINISTRADOR QUE PUEDA ELIMINAR 
    check('id',' No es un id de Mongo ').isMongoId(),
    check('id').custom(existeCategoriaPorId),

   
    ValidarCampos,

],eliminarCategoria)




module.exports = router;