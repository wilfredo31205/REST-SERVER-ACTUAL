

const mongoose = require('mongoose');


const dbConnection = async()=>{


    try {

     await  mongoose.connect(process.env.MONGODB_CNN,{ // MONGODB_CNN es el nombre de la conexion de la base d edatos que esta en .env


        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false

     });

     console.log('Base de datos creada correctamente')






        
    } catch (error) {

        console.log(error);
        throw new Error('error a la hora de iniciar la base de datos'); // si hay un error en la conexion

        
    }




}

module.exports ={

    dbConnection



}