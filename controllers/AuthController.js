const { request, response, json } = require("express");
const User = require( '../models/database/User' );
const bcryptjs = require( 'bcryptjs' );
const { generarJWT } = require("../helpers/generateJWT");

const login = async ( req = request, res = response ) => {

	const { email, password } = req.body;

	try {
		
		const user = await User.findOne( { email } );

		// Verificar si existe el email existe
		if( ! user )
			return res.status( 400 )
						.json( {
							msg: 'Email / Password no son correctos 1'
						} );

		// Si el usuario esta activo
		if( ! user.state )
			return res.status( 400 )
						.json( {
							msg: 'No existe el usuario'
						} );

		// Verificar el password
		const validPassword = bcryptjs.compareSync( password, user.password );

		if( ! validPassword ) 
			return res.status( 400 )
						.json( {
							msg: 'Email / Password no son correctos 2'
						} );

		// Generar el Json Web token
		const token = await generarJWT( user.id );

		res.json({
			msg: 'login ok',
			user,
			token
		});

	} //end try 
	catch (error) {
		return res.status( 500 )
		.json({
			msg: 'Error',
			error
		});
	} //end catch

} //End function 

module.exports = {
	login,
}