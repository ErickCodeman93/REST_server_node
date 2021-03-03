const express = require( 'express' );
const cors = require( 'cors' );
const { dbConnection } = require( '../../database/config' );
const { 
	authRoutes,
	usersApiRoutes,
	categoriesRoutes,
	productsRoutes,
	searchRoutes } = require( '../../routers' );

class Server {

	constructor() {

		this.app = express();
		this.port = process.env.PORT;
		this.routesPath = { 
			users : '/api/users',
			authPath: '/api/auth',
			categories: '/api/categories',
			products: '/api/products',
			search: '/api/search',
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
		this.app.use( this.routesPath.authPath, authRoutes );
		this.app.use( this.routesPath.users, usersApiRoutes );
		this.app.use( this.routesPath.categories, categoriesRoutes );
		this.app.use( this.routesPath.products, productsRoutes );
		this.app.use( this.routesPath.search, searchRoutes );
	} //end method

	listen(){
		this.app.listen( this.port ,() => console.log( `Listen in port: ${ this.port }` ) );
	} //end method

} //end class

module.exports = Server;