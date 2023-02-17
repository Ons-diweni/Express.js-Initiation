//configuration de notre serveur http

//cette methode est utilisée pour charger les variables d'environnement à partir du fichier .env et les stocker dans l'objet process.env
require('dotenv').config()


const http = require('http');
const app = require('./app');

var port = process.env.PORT || 3000;

const server = http.createServer(app)
server.listen(port, () => console.log(`server run with port ${port} in the host ${process.env.HOSTNAME}`))