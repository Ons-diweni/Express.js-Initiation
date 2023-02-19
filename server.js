//configuration de notre serveur http dans ce fichier
//cette methode est utilisée pour charger les variables d'environnement à partir du fichier .env et les stocker dans l'objet process.env
require('dotenv').config()
const http = require('http');
const app = require('./app');


//cette fonction de gestion des erreurs est utilisée pour capturer et gérer les erreurs qui peuvent survenir lors du démarrage du serveur, 
//en fournissant des messages d'erreur plus informatifs à l'utilisateur et en quittant le processus avec un code d 'état approprié.
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


//cette fonction est utilisée pour normaliser les numéros de port afin de s'assurer qu'ils sont valides et utilisables par le serveur
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};


const port = normalizePort(process.env.PORT || 3000);
//initialiser la proprièté port de l'objet app 
app.set('port', port);

//creation du serveur à l'aide du module http 
const server = http.createServer(app)

//Configuration de deux evénements error et listening 
server.on('error', errorHandler);
server.on('listening', () => {
    //La méthode server.address() est utilisée pour récupérer l'adresse IP et le numéro de port sur lequel le serveur est en train d'écouter.
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

//Lancer le serveur
server.listen(port)