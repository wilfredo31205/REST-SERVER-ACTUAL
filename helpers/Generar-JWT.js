
const jwt = require('jsonwebtoken');







const GenerarJWT = ( uid = '')=>{



    return new Promise((resolve, reject ) =>{ // trabajando en base a promesas




        const payload = { uid }; // grabando en el payload el id del usuario para identificarlo , podriamos guardar otros datos como : nombre , apellido, ect.. pero 
        // en este caso guardamos el id, ya que no podemos colocar informaciones relevantes



    
        // generando o firmando el jwt
        

        //    // secretOrPrivateKey es una llave secreta que si alguien la llega a conocer va a poder a firmar token como si nosotros lo hubieramos firmado en nuestro backend , esta definido en el archivo .env
   // de igual manera esta variable de  entorno podra firmar el token  


        jwt.sign(payload, process.env.secretOrPrivateKey,{ // .sign se utiliza para firmar un nuevo token  


            expiresIn: '4h' // colocando el tiempo de expiracion de mi token  ,  lo podemos colocar   expiresIn: '365' que expire en 365 dias o 24h

            





        },(err , token ) =>{ // err : por si hay un error y el token por si sale bien

            if(err){

                console.log(error);

                    reject('No se pudo  generar el token');

            }else{


                resolve(token);

            }


        })


    })


}





module.exports = {

    GenerarJWT

}