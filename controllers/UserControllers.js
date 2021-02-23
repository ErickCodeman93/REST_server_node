const { response, request } = require( 'express' );
const User = require( '../models/User' );
const bcryptjs = require( 'bcryptjs' );

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

	const existEmail = await User.findOne({ email });

	if( existEmail )
		return res
			.status( 400 )
			.json({
				msg:'Email duplicate'
			});

	//Encriptar
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync( password, salt );

	await user.save();

	res.json( {
		ok: true,
		msg: 'post Api - controller',
		data: user
	} );
} //end function

const putUsers = ( req = request, res = response ) => {

	const id = req.params.id;

	res.json( {
		ok: true,
		msg: 'put Api - controller',
		msg: id
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