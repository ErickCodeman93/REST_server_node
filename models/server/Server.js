const express = require( 'express' );
const cors = require( 'cors' );
const { dbConnection } = require( '../../database/config' );

class Server {

	constructor() {

		this.app = express();
		this.port = process.env.PORT;
		this.routesPath = { 
			users : '/api/users',
			authPath: '/api/auth',
		};

		//Connection DB
		this.dbConnect();

		// Middlewares
		this.middlewares();

		//Routes
		this.routes();
	} //end constructor


	async dbConnect(){
		await dbConnection();
	}

	middlewares(){

		// Cors
		this.app.use( cors() );

		// Lectura y parseo del Body
		this.app.use( express.json() );

		// Directorio publico
		this.app.use( express.static( 'public' ) ); 
		
	} //end method

	routes(){
		this.app.use( this.routesPath.authPath, require('../../routes/auth') );
		this.app.use( this.routesPath.users, require('../../routes/users.api') );
	} //end method

	listen(){
		this.app.listen( this.port ,() => console.log( `Listen in port: ${ this.port }` ) );
	} //end method

} //end class

module.exports = Server;