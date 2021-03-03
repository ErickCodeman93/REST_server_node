const { Category, Role, User, Product } = require('../models/database');

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


const paginationValidator = ( startQuery, islimit = false ) => {
	
	let isNumber;
	const reg = /^\d+$/;
	const queryParam = Number( startQuery );

	if( islimit )
		isNumber = reg.test( queryParam ) ? Number( queryParam ) : 5;	
	else
		isNumber = reg.test( queryParam ) ? Number( queryParam ) - 1 : 0 ;	

	return Math.sign( isNumber ) === -1 ? 0 : isNumber;

} // end function

const idCategoryValidator = async ( id = '' ) => {

	const existId = await Category.findById( id );

	if( ! existId )
		throw new Error( `No existe el id ${ existId.id } en la base de datos` );

	if( ! existId.state )
		throw new Error( `El id ${ existId.id } fue dado de baja en la base de datos` );

} //end function

const idProductValidator = async ( id = '' ) => {

	const existId = await Product.findById( id );

	if( ! existId )
		throw new Error( `No existe el id ${ existId.id } en la base de datos` );

	if( ! existId.state )
		throw new Error( `El id ${ existId.id } fue dado de baja en la base de datos` );

} //end function


module.exports = {
	roleValidator,
	emailValidator,
	idValidator,
	paginationValidator,
	idCategoryValidator,
	idProductValidator
}