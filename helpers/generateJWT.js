const jwt = require( 'jsonwebtoken' );

const generarJWT = ( uid ) => {

	return new Promise( ( resolve, reject ) => {

		const payload = { uid };

		jwt.sign( payload, process.env.PRIVATEKEYJWT,{
			expiresIn:'4h'
		},( err, token ) => {

			if( err ){

				console.log( err );
				reject( 'No se pudo generar el token' )
			} //end if
			else
				resolve( token );

		} );

	} );

} // end function



module.exports = {
	generarJWT
}