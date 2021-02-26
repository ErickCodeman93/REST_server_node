require( 'dotenv' ).config();
const Server = require("../models/server/Server");

const server = new Server();

server.listen();