const { request, response } = require('express');
const jwt = require( 'jsonwebtoken' );

const User = require( '../models/database/User' );

const validateJWT = async ( req = request, res = response, next ) => {

	const token = req.header( 'x-token' );

	if( ! token ) 
		return res.status( 401 )
					.json({
						msg:'No existe el token'
					});

	try {
		
		const { uid } = jwt.verify( token, process.env.PRIVATEKEYJWT );

		// Leer usuario
		const user = await User.findById( uid );

		if( ! user )
			return res.status( 401 )
						.json({
							msg: 'Token no valido - no existe el usuario'
						});

		// Verificar si el estado esta en true
		if( ! user.state )
			return res.status( 401 )
						.json({
							msg: 'Token no valido - usuario con estado false'
						});

		req.user = user;
		next();

	} // end try 
	catch (error) {

		res.status( 401 )
					.json({
						msg:'Token no valido'
					});
	} // end catch

} // end fucntion


module.exports = {
	validateJWT
}