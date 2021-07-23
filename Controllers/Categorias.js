const { response } = require("express");
const  Categoria = require("../models/Categoria");


// ObtenerCategoria  - paginado -total - populate 



const ObtenerCategoria = async(req, res = response )=>{

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)

            .populate('usuario','Nombre')
     
            // populate se utiliza para hacer la relacion para que aparezca el nombre del usuario y toda la informacion del usuario para indicar quien fue que lo grabo 
        
         //   .populate('usuario','nombre') // mandandole la referencia en la cual vmaos a hacer la relacion que en este caso es usuario
            // el nombre es lo que nos interesa mostrar


            
            .skip( Number( desde ) )
            .limit(Number( limite ))
            

         ]);



        res.json({

            total,
            categorias
          //  ObtenerCategoria,
           // crearCategoria

            

        })




}




const crearCategoria = async(req, res = response)=>{
 


    // ObtenerCategoria  - paginado -total - populate 







    // populate se utiliza para hacer la relacion para que aparezca el nombre del usuario y toda la informacion del usuario para indicar quien fue que lo grabo 




     // ObtenerCategoria  - populate { }  va a regresar el objeto de la categoria 







    const  nombre  = req.body.nombre.toUpperCase(); // req.body.nombre , tomando el nombre que viene en el body y convirtiendo las categorias en mayusculas


    // revisando si existe una categoria guardada
        const categoriaDB = await  Categoria.findOne({nombre})


        if (categoriaDB){

            return res.status(400).json({

                msg: `La categoria  ${categoriaDB.nombre} , ya existe`


            });

        }
    


        // Generar la data 


        const data = {

            nombre,
            usuario: req.usuario._id

        }


        const categoria = new Categoria(data) // mandandole la data que queremos grabar


        // Guardan en la BD
        
        await categoria.save()
        
        res.status(201).json({ // usualmente cuando creamos algo el status que se manda es el 201 , que significa que se creo 

            categoria

        })




}




const obtenerCategoria = async(req, res = response)=>{

    
     // ObtenerCategoria  - populate { }  va a regresar el objeto de la categoria 


        const { id } = req.params;


        const categoria = await  Categoria.findById(id).populate('usuario', 'Nombre');



        res.json(categoria)






}







// actualizarCategoria




// borrarCategoria -estado : mas bien es cambiar el estado a false que por defecto viene como true 







module.exports = {
    
    crearCategoria,
    ObtenerCategoria,
    obtenerCategoria 


}