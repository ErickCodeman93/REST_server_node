const mongoose = require( 'mongoose' );
const { Category } = require('../models/database');

const capitalizeText = ( text = '' ) => newName = text.split(' ')
												.map( name => name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase() )
												.join( ' ' );

const isMongoIdVerify = ( mongoId = '' ) =>  mongoose.isValidObjectId( mongoId );

const idCategoryValidatorController = async ( id = '' ) => {

	try {
		
		const existId = await Category.findById( id );
		return existId && existId.state ? true : false;

	} //end try 
	catch (error) {

		return false;
	} // end catch
	
} // end function 


module.exports = {
	capitalizeText,
	isMongoIdVerify,
	idCategoryValidatorController
}