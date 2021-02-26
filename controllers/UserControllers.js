const { response, request } = require( 'express' );
const { encryptPassword } = require('../helpers/encryptPWS');
const User = require( '../models/database/User' );

// ::::::::::::::::::::::::::::::: Controllers ::::::::::::::::::::::

const getUsers = ( req = request, res = response ) => {

	const params = req.query;

	res
	.json( {
		ok: true,
		msg: 'get Api - controller',
		params
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

const deleteUsers = ( req = request, res = response ) => {

	res.json( {
		ok: true,
		msg: 'delete Api - controller'
	} );
} //end function


module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers,
}