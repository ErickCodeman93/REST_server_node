const { request, response } = require("express");
const bcryptjs = require( 'bcryptjs' );

const { User } = require( '../models/database' );
const { generarJWT, googleVerify } = require( "../helpers" );


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

const googleSignIn = async ( req = request, res = response ) => {

	const { id_token } = req.body;

	try {

		const { name, email, picture:img } = await googleVerify( id_token ); 

		let user = await User.findOne( { email } );

		if( ! user ) {

			//Crear usuario
			const data = {
				name,
				email,
				password: '1341234',
				img,
				google: true,
			};

			user = new User( data );

			await user.save();
		} //end if

		if( ! user.state )
			res.status( 400 )
				.json({
				msg: 'Usuario bloqueado',
			});

		// Generar el Json Web token
		const token = await generarJWT( user.id );
		
		res.json({
			user,
			token
		});

	} // end try 
	 catch (error) {
		
		res.status( 400 )
			.json({
			msg: 'Token de google no es valido',
		});
	} // end cath

} //End function 

module.exports = {
	login,
	googleSignIn
}