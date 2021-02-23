const { response, request } = require('express');

// ::::::::::::::::::::::::::::::: Controllers ::::::::::::::::::::::

const getUsers = ( req = request, res = response ) => {

	const params = req.query;

	res
	.json( {
		ok: true,
		msg: 'get Api',
		params
	} );
}  //end function

const postUsers = ( req = request, res = response ) => {

	const body = req.body;

	res.json( {
		ok: true,
		data: body
	} );
} //end function

const putUsers = ( req = request, res = response ) => {

	const id = req.params.id;

	res.json( {
		ok: true,
		msg: id
	} );
} //end function

const deleteUsers = ( req = request, res = response ) => {

	res.json( {
		ok: true,
		msg: 'delete Api'
	} );
} //end function


module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers,
}