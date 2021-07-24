const { response } = require("express");


const { ObjectId } = require('mongoose').Types;

const { Usuario , Categoria, Productos } = require('../models/');




// aqui van a estar todas las colecciones que tengo validas que yo he creado 

const coleccionesPermitidas =[ // vamos a utilizar esta coleccion pora verificar si la coleccion que se esta escribiendo p0r el url esta en este arreglo , si esta ahi lo dejamos pasar , sino mostramos un error 

    'usuarios',
    'productos',
    'categorias',
    'roles'
]


const buscarUsuarios = async  ( termino = '' , res = response)=>{ // pasandole el termino como un string vacio 



    const esMongoId = ObjectId.isValid(termino) // si es un id de mongo va a regresar un true, sino lo  es un false


    if(esMongoId){ // si es un id de mongo


        const usuario = await Usuario.findById(termino); // en este caso el termino es el id 


       return  res.json({

            results: (usuario) ? [usuario] : [] // si el usuario existe voy a retornar el arreglo con el usuario , en caso contrario voy a regresar un arreglo  vacio

        })

    }



    const regex = new RegExp( termino , 'i'); // utilizando expression regular  le pasamos el termino y le pasamos que sea insensible a la mayusculas y minusculas  ,  RegExp: significa expression regular, viene  por  default en js 



    const usuarios = await Usuario.find({

            $or : [{Nombre : regex  }, { Correo : regex }], // que el nombre coincida con la expresion regular o el correo coincida con la expresion regular 


            $and: [{estado: true }] // y el estado tiene que estar como true, es decir el estado del usuario
        



     });



   return  res.json({

            results: usuarios

        })

    }




// Buscando por categorias 




const buscarCategoria = async  ( termino = '' , res = response)=>{ // pasandole el termino como un string vacio 



    const esMongoId = ObjectId.isValid(termino) // si es un id de mongo va a regresar un true, sino lo  es un false


    if(esMongoId){ // si es un id de mongo


        const categorias = await Categoria.findById(termino); // en este caso el termino es el id 


       return  res.json({

            results: (categorias) ? [categorias] : [] // si el usuario existe voy a retornar el arreglo con el usuario , en caso contrario voy a regresar un arreglo  vacio

        })

    }



    const regex = new RegExp( termino , 'i'); // utilizando expression regular  le pasamos el termino y le pasamos que sea insensible a la mayusculas y minusculas  ,  RegExp: significa expression regular, viene  por  default en js 



    const categorias = await Categoria.find({

            $or : [{nombre : regex  }], // que el nombre coincida con la expresion regular o el correo coincida con la expresion regular 

            $and: [{estado : true}]

           
        



     });



   return  res.json({

            results: categorias

        })

    }

//---------------------------------------------------------------------..-----------------------...-----------------------------------...--------------------------------------...-----


// Buscando por productos 




const   buscarProducto = async  ( termino = '' , res = response)=>{ // pasandole el termino como un string vacio 



    const esMongoId = ObjectId.isValid(termino) // si es un id de mongo va a regresar un true, sino lo  es un false


    if(esMongoId){ // si es un id de mongo


        const productos = await Productos.findById(termino).populate('categoria','nombre') // en este caso el termino es el id 


       return  res.json({

            results: ( productos) ? [ productos] : [] // si el usuario existe voy a retornar el arreglo con el usuario , en caso contrario voy a regresar un arreglo  vacio

        })

    }



    const regex = new RegExp( termino , 'i'); // utilizando expression regular  le pasamos el termino y le pasamos que sea insensible a la mayusculas y minusculas  ,  RegExp: significa expression regular, viene  por  default en js 



    const  productos = await Productos.find({ nombre : regex,estado : true }) // que el nombre coincida con la expresion regular o el correo coincida con la expresion regular 

                                        .populate('categoria','nombre')
                                        



   return  res.json({

            results:  productos

        })
  
    }




//-------------------------------------------------------------------------------------------------------------------------------------------------------










const buscar = (req, res = response)=>{



    const { coleccion , termino  } = req.params; // la coleccion y termino es el enpoint que viene desde el route que le estamos pasando estos mismos 



    if(!coleccionesPermitidas.includes(coleccion)){// si las colecciones permitidas  no la incluye incluye la coleccion que le estoy mandando 
 

        return res.status(400).json({

                msg: ` Las colecciones permitidas son ${coleccionesPermitidas}`
        })



    } 



    switch (coleccion) {


        case 'usuarios':

            buscarUsuarios(termino , res );
            
            break;
    

            case 'categorias':

                buscarCategoria(termino , res );
            
                break;


         case 'productos':

            buscarProducto(termino , res );

            
            break;





        default:

            res.status(500).json({  //status.500 = error del servidor , problema de quien esta haciendo el backend 
                
                    msg: `Se le olvido hacer esta busqueda `

            })

           
    }




}


module.exports = {


    buscar

}