const { response, request } = require( 'express' );
const { paginationValidator } = require('../helpers/dbValidators');
const { encryptPassword } = require('../helpers/encryptPWS');
const User = require( '../models/database/User' );

// ::::::::::::::::::::::::::::::: Controllers ::::::::::::::::::::::

const getUsers = async ( req = request, res = response ) => {

	const { limit = 5, from = 0 } = req.query;

	let startPagination = paginationValidator( from ); 
	let endPagination = paginationValidator( limit, true );
	const query = { state: true };

	const [ total, user ] = await Promise.all([
		User.countDocuments( query ),
		User.find( query )
			.skip( startPagination )
			.limit( endPagination )
	]);

	res
	.json( {
		ok: true,
		msg: 'get Api - controller',
		total,
		user,
	} );

}  //end function

const postUsers = async ( req = request, res = response ) => {

	const { name, email, role, password } = req.body;
	const user = new User( { name, email, role, password } );

	user.password = encryptPassword( password );

	await user.save();

	res.json( {
		ok: true,
		msg: 'post Api - controller',
		data: user
	} );
} //end function

const putUsers = async ( req = request, res = response ) => {

	const { id } = req.params;
	let { _id, password, google, email, ...data } = req.body;

	//Encriptar password
	if( password )
		data.password = encryptPassword( password );
	
	const userUpdate = await User.findByIdAndUpdate( id, data,  { new: true } );	

	res.json( {
		ok: true,
		msg: 'put Api - controller',
		userUpdate
	} );
} //end function

const deleteUsers = async ( req = request, res = response ) => {

	const { id  } = req.params;

	const deleteUser = await User.findByIdAndUpdate( id, { state:false }, { new: true }  );

	res.json( {
		ok: true,
		msg: 'delete Api - controller',
		deleteUser
	} );
} //end function


module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers,
}