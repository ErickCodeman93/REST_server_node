require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );

class Server {

	constructor() {

		this.app = express();
		this.port = process.env.PORT;

		// Middlewares
		this.middlewares();

		//Routes
		this.routes();
	} //end constructor

	middlewares(){

		// Cors
		this.app.use( cors() );

		// Directorio publico
		this.app.use( express.static( 'public' ) ); 
	} //end method

	routes(){

		this.app.get( '/api', ( req, res ) => {
			res
			.json( {
				ok: true,
				msg: 'get Api'
			} );
	   } );

	   this.app.post( '/api', ( req, res ) => {

			res.json( {
				ok: true,
				msg: 'post Api'
			} );
   		} );

		this.app.put( '/api', ( req, res ) => {

			res.json( {
				ok: true,
				msg: 'put Api'
			} );
	   	} );

		this.app.delete( '/api', ( req, res ) => {

			res.json( {
				ok: true,
				msg: 'delete Api'
			} );
	   	} );

	} //end method

	listen(){
		this.app.listen( this.port ,() => console.log( `Listen in port: ${ this.port }` ) );
	} //end method

} //end class

module.exports = Server;