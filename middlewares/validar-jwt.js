
const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');




 // validando el token 
const validarJWT = async ( req = request, res = response, next)=>{



    const token = req.header('x-token');




    if(!token){

        return res.status(401).json({

            msg: ' No hay token en la peticion '

        })


    }

   // console.log(token);


   // next();



   try {
       
    // estda funcion nos servira para verificar el json web token 

       const { uid } =  jwt.verify(token , process.env.secretOrPrivateKey); //  validando el token con .verify , le pasamos el token y el secretprivatekey que lo tenemos en .env



        // Leer el usuario que corresponda al uid

         const usuario = await Usuario.findById(uid); // lo que encontremos en el modelo lo vamos a almacenar ahi  en el uid  o id de monfo ,          // esto significa si existe un usuario y el usuario se encontro 



            
            if(!usuario){ // si el usuario no existe



                return res.status(401).json({
                        msg: ' Usuario no existe en la base de datos '
                })
            
            

            }






            // verificar si el uid tiene estado true

            if(usuario.estado === false){  // si el usuario esta como false  o si eliminamos el usuario

                return res.status(401).json({

                        msg: ' Token no valido - Usuario con estado false '

                })



            }





      req.usuario = usuario; // si tenfgo el uid lo que voy a hacer es ponerlo en la req. uid del usuario req.= request 


       // req.uid = uid creando una propiedad nueva del objeto request  , ya que en javascript todo pasa por referencia por la cual es la misma request o req que tenemos en todos los archivos





        //  const { uid } extrayendo el id del payload 


      // console.log(payload);


        next();
   } catch (error) { // si jwt no es valido nos dispara esta funcion que tenemos aqui 

     console.log(error);

    res.status(401).json({

            msg:'Token no valido'

    })


       
   }





}

module.exports = {

    validarJWT

}