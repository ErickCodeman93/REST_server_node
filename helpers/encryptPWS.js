const bcryptjs = require( 'bcryptjs' );

const encryptPassword = ( password = null ) => {

	if ( ! password )
		throw new Error( 'Necesitas agregar un password' );

	//Encriptar
	const salt = bcryptjs.genSaltSync();
	return bcryptjs.hashSync( password, salt );

} // end function


module.exports = {
	encryptPassword
}