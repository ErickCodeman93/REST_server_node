const { request, response } = require("express")


const adminRole = ( req = request, res = response, next ) => {

	const user = req.user;

	if( ! user )
		return res.status( 500 )
					.json({
						msg: 'Falta token para verificar el rol'
					});

	const { role, name } = user;

	if( role !== 'ADMIN_ROLE' )
		return res.status( 401 )
					.json({
						msg: `${ name } no es administrador`
					});
					

	next();
} // end function

const permissionRole = ( roles = [] ) => {

	return ( req = request, res = response, next ) => {

		const user = req.user;

		if( ! user )
			return res.status( 500 )
						.json({
							msg: 'Falta token para verificar el rol'
						});

		if( ! roles.includes( user.role ) )
			return res.status( 401 )
						.json({
							msg: `El servicio requiere uno de estos roles ${ roles }`
						});			
			
		next();
	}
} // end function

module.exports = { 
	adminRole,
	permissionRole
}