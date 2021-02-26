const Role = require( '../models/database/Role' );
const User = require('../models/database/User');

const roleValidator = async( role = ''  ) => {
        
	const existRole = await Role.findOne( { role } );
	
	if( ! existRole )
		throw new Error( `El rol ${ role } no esta registrado en la base de datos` );
	
} // end function

const emailValidator = async ( email = '' ) => {

	const existEmail = await User.findOne( { email } );

	if( existEmail )
		throw new Error( `El email: ${ email } ya existe en la base de datos` );
			
} // end function

const idValidator = async ( id = '' ) => {

	const existId = await User.findById( id );

	if( ! existId )
		throw new Error( `El id: ${ id } no existe en la base de datos` );
} // end function

module.exports = {
	roleValidator,
	emailValidator,
	idValidator,
}