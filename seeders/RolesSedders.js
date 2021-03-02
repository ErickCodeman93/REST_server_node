const fs = require( 'fs' );
const { Role } = require( '../models/database' );

//:::::::::: Seddeer Role :::::::::::::::

const insertRoles = async () => {

	const path = __dirname + '/json/roles.json';

	if( ! fs.existsSync( path ) ){
		console.log( 'Not found file' );
		return;
	} // end if
		
	try {
		
		const info = fs.readFileSync( path, { encoding: 'utf-8' } );
		const data = JSON.parse( info );
		
		for ( const iterator of data ) {
			const role = new Role( { role: iterator.role } );
			await role.save();
		} // end for

		console.log( 'End insert seddeer roles' );
	} // End try 
	catch (error) {
		throw new Error( 'Error', error );
	} // End catch
		
} // end function

module.exports = {
	insertRoles,
}
