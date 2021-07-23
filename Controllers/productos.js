const { response } = require("express");
const { Productos } = require("../models");
const Producto = require("../models/producto");





const  obtenerProductos = async(req, res = response )=>{

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)

            .populate('usuario','Nombre')
     
            .populate('categoria','Nombre')


            // populate se utiliza para hacer la relacion para que aparezca el nombre del usuario y toda la informacion del usuario para indicar quien fue que lo grabo 
        
         //   .populate('usuario','nombre') // mandandole la referencia en la cual vmaos a hacer la relacion que en este caso es usuario
            // el nombre es lo que nos interesa mostrar
            
            .skip( Number( desde ) )
            .limit(Number( limite ))   

         ]);

        res.json({

            total,
            productos
          //  ObtenerCategoria,
           // crearCategoria
        })
}



const  obtenerProducto = async(req, res = response)=>{

    
    // ObtenerCategoria  - populate { }  va a regresar el objeto de la categoria 


       const { id } = req.params;


       const producto = await  Productos.findById(id)
       
                                    .populate('usuario', 'Nombre')
                                    .populate('categoria', 'Nombre');

       res.json(producto)

}


const crearProducto = async(req, res = response)=>{
 


    // ObtenerCategoria  - paginado -total - populate 

    // populate se utiliza para hacer la relacion para que aparezca el nombre del usuario y toda la informacion del usuario para indicar quien fue que lo grabo 
     // ObtenerCategoria  - populate { }  va a regresar el objeto de la categoria 

    const { estado , usuario , ...body } = req.body; // sacando el estado porque el usuario no deberia de cambiarlo y el usuario lo tenemos que ignorar y todo  lo demas lo traemos con el objeto de body



    // revisando si existe un Producto  guardada
        const productoDB = await  Producto.findOne({nombre : body.nombre})


        if (productoDB){

            return res.status(400).json({

                msg: `El producto   ${productoDB.nombre} , ya existe`


            });

        }
    
        // Generar la data 
        const data = {


            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id

        }


        const producto = new Producto(data) // mandandole la data que queremos grabar


        // Guardan en la BD
        
        await producto.save()
        
        res.status(201).json({ // usualmente cuando creamos algo el status que se manda es el 201 , que significa que se creo 

            producto
        })




}


const  actualizarProducto = async  (req, res = response)=>{



    const { id } = req.params  


    const { estado , usuario  , ...data} = req.body


    if(data.nombre){ 

        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id , data, {new : true});

    res.json({producto})

}




const borrarProducto = async (req, res = response )=>{


    const { id } = req.params


        const productoBorrado  = await  Producto.findByIdAndUpdate(id , {estado : false},{new: true} );



        res.json({productoBorrado})

}






// borrarCategoria -estado : mas bien es cambiar el estado a false que por defecto viene como true 







module.exports = {
    
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto ,
    borrarProducto


}






