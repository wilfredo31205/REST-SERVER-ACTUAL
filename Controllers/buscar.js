const { response } = require("express");




const buscar = (req, res = response)=>{



    const { coleccion , termino  } = req.params; // la coleccion y termino es el enpoint que viene desde el route que le estamos pasando estos mismos 



    res.json({


        coleccion,
        termino

    })




}


module.exports = {


    buscar

}