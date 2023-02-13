//configuration de notre serveur http

require('dotenv').config()


const http = require('http');
const app = require('./app');

var port = process.env.PORT || 3000;

const server = http.createServer(app)
server.listen(port, () => console.log(`server run with port ${port} in the host ${process.env.HOSTNAME}`))