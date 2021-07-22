const Server = require('./models/server');

require('dotenv').config(); // .config para que tome todo el archivo del archivo .env y establezca laas variables de entorno









// llamando la instancia de nuestro servidor que esta en server.js


const server = new Server();


server.listen();


module.exports=Server;