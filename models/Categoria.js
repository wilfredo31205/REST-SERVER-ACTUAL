

const { Schema , model } = require('mongoose');



const CategoriaSchema = Schema({


    nombre:{


        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true


    },

    estado:{

        type: Boolean,
       // estado: true,
        default: true,
        required: true

    },


    usuario:{ // cuando creemos una categoria vamos a saber que usuario la creo 



        type : Schema.Types.ObjectId , // es decir tiene que ser otro objeto que vamos a tener en mongo

        ref:  'Usuario' ,// manteniendo la referencia de donde va a puntar este object id m es decir de donde es que vamos a hacer la relacion 

        required: true// require en true, porque todas las categorias tienen que tener un usuario



    }










});


module.exports = model('Categoria',CategoriaSchema);