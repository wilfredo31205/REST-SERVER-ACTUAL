const { Router } = require('express'); 
const { check }  = require('express-validator');

const { validarJWT } = require('../middlewares');


const { ValidarCampos } = require('../middlewares/Validar-Campos');


const { ObtenerCategoria} = require('../Controllers/Categorias');



const {crearCategoria} = require('../Controllers/Categorias');





//const {ExisteCategoriaporID } = require('../Controllers/Categorias');




const router = Router();



// Obtener  todas las categorias -publico 

router.get('/',ObtenerCategoria);





// Obtener una categoria por id - publico
router.get('/:id',[ 


   // check('id').custom(existeCategoria)

],(req,res) =>{

    res.json('get -api')

});


//  Crear categoria -privado - cualquier persona con un token valido 


//validarJWT, // pasandole el middlware de validar el json web token para verificar que el usuario este registrado en nuestra aplicacion 
router.post('/',  [


    validarJWT,

    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // mandandole al usuario un mensaje de error por si no coloca el nombre



    ValidarCampos, // mandando a llamar el middleware donde contiene los errores 

    


] , crearCategoria) // modelo de categoria


// actualizar un registro por su id 
router.put('/:id', (req, res) =>{

    res.json('Actualizado via put');


})


 // borrar una categoria si solamente es un admin 


router.delete('/:id', (req, res) =>{

    res.json('Eliminando via delete - solo admin');


})




module.exports = router;