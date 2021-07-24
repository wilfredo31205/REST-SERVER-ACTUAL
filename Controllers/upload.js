const { response } = require("express");





const cargarArchivos = (req, res = response)=>{




        console.log(req.files)



        res.json({

                msg: 'Cargando archivos'

        })

    




}

module.exports = {

    cargarArchivos


}