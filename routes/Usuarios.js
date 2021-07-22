
 const { Router } = require('express'); // nos permite crear una instancia o llamada de nuestra funcion  de mi router
const { usuariosGet, usuariosPut, usuariosDelete } = require('../Controllers/usuarios');
const { usuariosPost  } = require('../Controllers/usuarios');

 const { check }  = require('express-validator');




 const { 


    ValidarCampos,
    validarJWT,
    tieneRole,
    esAdminRole


 } = require('../middlewares/index');

 //const { ValidarCampos } = require('../middlewares/Validar-Campos');
const { esRoleValido,  emailExiste , ExisteUsuarioporID } = require('../helpers/db-Validator');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/Validar-roles');



 const router = Router();




 router.get('/', usuariosGet  );

router.post('/', [

    // validando con express-validator 

    check('Nombre', 'El nombre es obligatorio').not().isEmpty(), // si colocamos solamente isEmpty significa que estoy preguntando que si esta vacio con .not hacemos la negacion 


    check('Password', 'El Password es obligatorio y tiene que ser mas de 6 digitos ') .isLength({ min: 6}),



    check('Correo').custom( emailExiste),  // con isEmail validamos los correos   // el check es una middlware en el cual le decimos que campo yo quiero validar 


   check('rol', 'No es un Rol valido').isIn(['ADMIN_ROLE' , 'USER_ROLE']), // preguntando que exista en un arreglo 
    // con .isIn preguntamos que exista en un arreglo, los que le pasemos entre corchetes si es admin_role , o user_Role como lo definimos en el modelo de Roles


//check('rol').custom( esRoleValido), // exportando el helperts de validacion que esta en el db-Validator.js 



    ValidarCampos // revisando cada uno de los errores de estos check


],usuariosPost);




router.put('/:id', [

    check('id','No es un ID vàlido').isMongoId(), // isMongoId //  validando por el id de mongo 

    check('id').custom(ExisteUsuarioporID),
    
check('rol').custom(esRoleValido), // exportando el helperts de validacion que esta en el db-Validator.js 




    ValidarCampos // funcion que valida los  campos 

],usuariosPut);  // para actualizar registro se coloca un comodin de : mas el nombre



router.delete('/:id',[ // podemos controlar todo estos middleware si el controlador tiene un jwt
 
    validarJWT ,// MIDDLEWARE QUE VALIDA EL JSON WEB TOKEN  , los middleware se ejecutan uno despues del otro 
 
   // esAdminRole,
   
   

   tieneRole('USER_ROLE' , 'SUPER_ROLE','ADMIN_ROLE'),
    check('id','No es un ID vàlido').isMongoId(), // isMongoId //  validando por el id de mongo 

    check('id').custom(ExisteUsuarioporID),
    

    ValidarCampos
 
    
    
],usuariosDelete) 




module.exports = router;