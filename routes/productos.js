const { Router } = require('express'); 
const { check }  = require('express-validator');

const { validarJWT, esAdminRole } = require('../middlewares');


const { ValidarCampos } = require('../middlewares/Validar-Campos');

const { 
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto

} = require('../Controllers/productos');


const {   existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-Validator');
 



//const {ExisteCategoriaporID } = require('../Controllers/Categorias');




const router = Router();



// Obtener  todas las categorias -publico 

router.get('/',obtenerProductos);





// Obtener una categoria por id - publico
router.get('/:id',[ 

    check('id',' No es un id de Mongo ').isMongoId(),

    
    ValidarCampos,

    check('id').custom(existeProductoPorId)


],obtenerProducto);


//  Crear categoria -privado - cualquier persona con un token valido 


//validarJWT, // pasandole el middlware de validar el json web token para verificar que el usuario este registrado en nuestra aplicacion 
router.post('/',  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // mandandole al usuario un mensaje de error por si no coloca el nombre
    check('categoria', 'No es un id de mongo ').isMongoId( ),
    ValidarCampos, // mandando a llamar el middleware donde contiene los errores 
] , crearProducto) // modelo de categoria


// actualizar un registro por su id 
router.put('/:id',[
    validarJWT,
   // check('categoria', 'No es un id de mongo ').isMongoId( ),
    check('id').custom(existeProductoPorId),
    ValidarCampos
],actualizarProducto); 


 // borrar una categoria si solamente es un admin 
router.delete('/:id',[

    validarJWT,

    esAdminRole, // validando con el middlware de esadmiROLE QUE SOLAMENTE SEA EL ADMINISTRADOR QUE PUEDA ELIMINAR 
    check('id',' No es un id de Mongo ').isMongoId(),
    check('id').custom(existeProductoPorId),
    ValidarCampos,

],borrarProducto)




module.exports = router;