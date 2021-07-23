

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



     //   type : Schema.Types.ObjectId , // es decir tiene que ser otro objeto que vamos a tener en mongo


        type: Schema.Types.ObjectId,


        ref:  'Usuario' ,// manteniendo la referencia de donde va a puntar este object id m es decir de donde es que vamos a hacer la relacion 

        required: true// require en true, porque todas las categorias tienen que tener un usuario



    }


});


CategoriaSchema .methods.toJSON = function(){ // tiene que ser una funcion normal, porque vamos a utilizar thisy en la funcion de flecha no se puedse

    // cuando se mande a llamar el toJson se va a generar esta funcion que va a quitar o sacar  el Password y la version __v
   
   
       const {__v,estado , ...data} = this.toObject(); //  nos va a generalizar una instancia de los valores respectivos de este modelo
   
     //  usuario.uid = _id;// cambiando el nombre del id por uid para que nos muestre uid en postman  
   
       return data ;
   
       // utlizando el operador Rest .... para unificarlos en uno solo que se llame usuar


}


module.exports = model('Categoria',CategoriaSchema);