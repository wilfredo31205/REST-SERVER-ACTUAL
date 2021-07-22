const { response } = require("express");
const Usuario = require("../models/usuario");

const bcrytjs = require('bcryptjs');


const { GenerarJWT } = require("../helpers/Generar-JWT");



const login = async(req, res = response)=>{


    const {Correo , Password} = req.body;



    try {
        
        // Verificar si el correo existe

        const usuario =  await Usuario.findOne({Correo})

        if(!usuario){

            return res.status(400).json({

                    msg:'Usuario/ Password no son correctos - Correo '
            })

        }


        // Si el usuario esta activo 

             if(usuario.estado === false){ // si el usuario en el estado esta como false 

            return res.status(400).json({

                    msg:'Usuario/ Password no son correctos - estado: false '
            })

        }



        // verificar la contraseña 


        const validarPassword = bcrytjs.compareSync(Password, usuario.Password);

        if(!validarPassword){ // si la contraseña no es valida 



                return res.status(400).json({
    
                        msg:'Usuario/ Password no son correctos - Password'
                })
    
            



        }


        // generar el json web token jwt


        const token = await GenerarJWT(usuario.id); // guardando en el payload el usuario.id o el id 


        // secretOrPrivateKey es una llave secreta que si alguien la llega a conocer va a poder a firmar token como si nosotros lo hubieramos firmado en nuestro backend , esta definido en el archivo .env
        // de igual manera esta variable de  entorno podra firmar el token  
        
        res.json({

            usuario, // regresando el usuario que se acaba de autenticar 
            token // y mandando el token tambien 

    
        })
    




    } catch (error) {
        
        console.log(error);

        return res.status(500).json({

            msg: "Hable con el administrador"



        })

    }

}




        const googleSignin = (req, res=response)=>{


            const {id_token} = req.body




            res.json({

                msg: 'Todo ok !  Google singnin',
                id_token

            })



      }


module.exports = {

    login,
    googleSignin

}