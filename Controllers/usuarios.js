
const { response  } = require('express');

const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario'); // le colocalos la primera letra en mayuscula de Usuario 

// porque nos permite crear instancias de nuestro modelo 



// CONTROLADOR 


const usuariosGet =  async (req, res = response) => {








        const { limite = 5 , desde = 0  } = req.query;


        const query = {estado: true}

    //     const usuario =  await Usuario.find(query) //mandando a llamar todos los registros

    //     //({ estado:true} : filtrando los registros o usuarios que solamente esten activos o true



 


    //     .skip(Number(desde)) // es decir cuanto registro quiero empezar o desde cuantos registros quiero filtrar 
    //     .limit( Number(limite));

    


    //    // .limit(2); // con limit : limitamos el numero de registro por consulta, es decir le decimos que nos traiga los 2 primeros registros 




    //    const total = await Usuario.countDocuments(query); // filtrando cuanto registros tengo en mi base de datos 


       const resp = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query) 


        .skip(Number(desde)) // es decir cuanto registro quiero empezar o desde cuantos registros quiero filtrar 
        .limit( Number(limite))
       ])


       




    res.json({ // el codigo 403 lo vamos a utilizar cuando una persona no este autenticada en nuestro enpoints

        resp


       //usuario,
        //total

});


}
// post 

const usuariosPost = async (req, res = response)=>{


  




  //  const body = req.body; // req.body es lo que la persona esta solicitando



    //const { google , ...resto } = req.body; // si tuviera muchisimos campos , para traer los demas 
    // lo hago mediante el operador rest colocando ...resto 


    //const body = req.body // con destruncturing 


    const { Nombre, Correo,Password, rol } = req.body

    const usuario = new Usuario({ Nombre, Correo , Password,  rol}); 

    // verificar si el correo existe

    /*--------------------------------  0JO--------------*/ 
    // Encristar la contraseña 


    const salt  = bcryptjs.genSaltSync(); // el salt es el numero de vueltas que queremos hacer para hacer mas complicada la encristacion
    // mientras mas vuelta le damos es mejor, mayoritariamente le damos 10 

    usuario.Password = bcryptjs.hashSync(Password, salt); // el hash es para incristarlo en una sola via  , pide 2 cosas, el passsword y el salt 





    await usuario.save(); // para guardar el registro se utiliza .save 

    res.json({

        mgsg : 'get-api- controlador via post ',
        usuario
    
    })

}


// put 

const usuariosPut  = async (req, res = response)=>{



  // const  {id} = req.params.id;

  
  const  { id } = req.params;


    // destructurando ´

   const { _id , Password , Google , Correo,  ...resto  } = req.body // ...resto , significa que nos traiga el resto de las propiedades

   

    // TODO : VALIDAR CON LA BASE DE DATOS

    if(Password){ // si existe el Password  , significa que el usuario desea actualizar su contraseña 



        const salt  = bcryptjs.genSaltSync(); // el salt es el numero de vueltas que queremos hacer para hacer mas complicada la encristacion
        // mientras mas vuelta le damos es mejor, mayoritariamente le damos 10 
    
        resto.Password = bcryptjs.hashSync(Password, salt); // el hash es para incristarlo en una sola via  , pide 2 cosas, el passsword y el salt 
    

    }


    const usuario = await Usuario.findByIdAndUpdate(id, resto) // findByIdAndUpdate , lo actualiza por el id y lo busca





    
    res.json({

      
        usuario
       // nombre,
        //edad,
    
     //   id

    })

}





const usuariosDelete  = async (req, res = response)=>{



    const {id } = req.params;

    // despues de validar el token 

   // const uid = req.uid; // extrayendo uid que viene de la req.uid

    // eliminando el registro

    //const usuario = Usuario.findByIdAndDelete(id);


    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})


 // const usuarioAutenticado = req.usuario



    res.json({

        usuario,
      //  usuarioAutenticado
       // uid

    })

}






module.exports = {

    usuariosGet, // importando este  arreglo de objeto 
    usuariosPost,
    usuariosPut,
    usuariosDelete

}


