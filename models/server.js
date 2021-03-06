


const express = require('express')

const cors = require('cors');


const fileUpload = require('express-fileupload');


const { dbConnection  } = require('../database/config');

class Server{


    constructor(){


        this.app = express();

        this.port = process.env.PORT;

        // conectar a la base de datos

        this.conectarDb();



        this.middlewares();



            this.path ={ // realizamos un arreglo de las rutas ya que si colocamos ruta tras ruta se veria un poco feo y desordenado el codigo 
    
                auth : '/api/auth',
                buscar : '/api/buscar',
                categorias : '/api/categorias',
                productos : '/api/productos',
                usuarios: '/api/usuarios',
                upload: '/api/upload',

          




            }



        //this.usuariosPath = '/api/usuarios' // definiend el enpoint o rutas de la app , en routes 
        // nada mas tengo que declarar esta variable llamada  usuariosPATH

        // middleware : son funciones que cada vez que se ejecuta el servidor, se ejecuta

        // rutas de la app

       // this.authPath = '/api/auth';
        
        this.routes();


    }
    
        // conectar a la base de datos


        async conectarDb(){

            await dbConnection();




            
        }





        middlewares(){ // un middlewares es una  funcion que se ejecuta antes de llamar al controlador o seguir con la ejecucion de mis peticiones
            

                // Cors
                this.app.use(cors());
                // Directorio publico 
                this.app.use(express.static('public'));

                // Lectura y parseo del body 
                this.app.use(express.json()); // hace la misma funcion que body-parser para leer la informacion que viene de postman 


                //Fileupload o carga de archivos 

                this.app.use(fileUpload({
                    useTempFiles : true,
                    tempFileDir : '/tmp/'
                }));



        }






    //metodo 


    routes(){
                

        
        this.app.use(this.path.auth, require('../routes/auth')); // ruta de autenticacion
     

        this.app.use(this.path.buscar, require('../routes/buscar'));


        
        this.app.use(this.path.categorias, require('../routes/categorias'));


        this.app.use(this.path.productos, require('../routes/productos'));



        this.app.use(this.path.usuarios, require('../routes/Usuarios'));


        this.app.use(this.path.upload, require('../routes/upload'));






        



}


    listen(){


        
 
    this.app.listen(this.port, ()=>{


    console.log('Servidor corriendo en puerto',this.port);



} )


    }



}


module.exports = Server;