const { response } = require("express")




// esta funcion se va a llamar despues que validemos el json web token 


// funcion que determina en la validacion el rol del usuario que si el usuario desea eliminar algo tiene que ser administrador solamente
const esAdminRole = ( req, res = response, next)=>{



    if(!req.usuario){ // si la req. usuario viene como undefined , significa de que no hemos evaluado correctamente nuestra peticion


        return res.status(500).json({

            msg: ' Se quiere verificar  el role sin validar el token primero'


        })


    }


        const { rol ,Nombre } = req.usuario; // este req.usuario se creo en base al uuid que viene en el json web token 




        if( rol !== 'ADMIN_ROLE'){ // si el rol es diferente del rol que queremos evaluar que en este caso es ADMIN_ROLE , sino es el admin role


            return res.status(401).json({

                msg: `${Nombre} no es administrador  - no puedes hacer esto `

            })

        }


            next(); // si es administrador entonces llamamos al nexct  y lo dejo pasar 


  //  req.usuario 





}

  const tieneRole = (...roles)=>{


    return( req, res = response, next) =>{


        if(!req.usuario){ // sino hay rol del usuario  , // si posa la validacion tengo el rol del usuario 

            return res.status(500).json({

                    msg: 'Se quiere verificar el role sin validar el token primero '

            });

        }


        if(!roles.includes(req.usuario.rol)){ // si no viene el rol que esta incluido en la req.usuario.rol que es de donde vienen los roles, nos lanze el mensaje 


            return res.status(401).json({


                msg: `El servicio requiere uno de estos roles ${roles}`

            })


        }











        //console.log(roles , req.usuario.role);

     //   console.log(roles, req.usuario.rol);



        next();

 

    }







}






module.exports = {

    esAdminRole,
    tieneRole


}