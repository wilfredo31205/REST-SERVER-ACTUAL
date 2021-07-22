
const { Schema , Model, model } = require('mongoose');


const UsuarioSchema = Schema({

    Nombre:{

        type: String,
        required :  [true, 'El nombre es obligatorio ']

    },

    Correo :{

        type: String,
        required :  [true, 'El correo es obligatorio '],
        unique: true
    },

    Password :{

        type: String,
        required :  [true, ' La contraseña es obligatoria'],
        unique: true
    },


    Imagen  :{

        type: String,
       
    },

    
    rol:{ // role o permisos de la aplicaion  // se va a validar a traves de la base de datos los roles 

        type: String,
        required: true,
        emun : ['ADMIN_ROLE' , 'USER_ROLE'] // VAMOS A VALIDAR EN LA BASE DE DATOS QUE TIPO
        // DE USUARIO ES SI ES ADMINISTRADOR O USUARIO 
       




    },

    Estado:{ // role o permisos de la aplicaion 

        type: Boolean,
        default : true, // se coloca true porque cuando creamos un usuario va a estar activado 
   
    },


    Google:{ //  diciendo si este usuario fue creado por google o inicio seccion por google 

        type: Boolean,
        default: false
        
    },

});




// De igual manera en los modelos puedo hacer metodos que me permitan a mi , sobrescribir los existentes de mongoose
// como findOne o crear metodos personalizados como validar correos, ect 



UsuarioSchema.methods.toJSON = function(){ // tiene que ser una funcion normal, porque vamos a utilizar thisy en la funcion de flecha no se puedse

 // cuando se mande a llamar el toJson se va a generar esta funcion que va a quitar o sacar  el Password y la version __v


    const {__v , Password, _id,  ...usuario } = this.toObject(); //  nos va a generalizar una instancia de los valores respectivos de este modelo

    usuario.uid = _id;// cambiando el nombre del id por uid para que nos muestre uid en postman  

    return usuario;

    // utlizando el operador Rest .... para unificarlos en uno solo que se llame usuario 






}





module.exports = model('Usuario',UsuarioSchema);