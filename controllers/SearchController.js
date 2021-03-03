const { request, response } = require("express")

const searchCafe = ( req = request, res = response ) => {

	const { coleccion, termino } = req.params;

	res.json({
		msg: 'ok',
		coleccion, 
		termino 
	});

} // end function

module.exports = {
	searchCafe
}