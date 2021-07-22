


// middleware para validar campos 

const { validationResult } = require('express-validator');



const ValidarCampos = (req, res , next  )=>{


    const errors = validationResult(req);

    if(!errors.isEmpty()){ // si hay errores  validando errores con express-validator 


        return res.status(400).json(errors);

    }

    next(); // next es lo que tenemos que llamar si este middleware pasa/ es decir que siga con la siguiente funcion o middleware 




}

module.exports ={
    

    ValidarCampos





}