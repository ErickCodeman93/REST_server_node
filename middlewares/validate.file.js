const { response, request } = require("express")

const validateFile = ( req = request , res = response, next ) => {

	if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo )
		return res.status(400).json( { msg: 'No existen archivos para subir.' });

	next();
} // end function

module.exports = {
	validateFile
}