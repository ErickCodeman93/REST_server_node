const { request, response } = require("express");
const { ObjectId } = require( 'mongoose' ).Types;
const { User, Category, Product } = require( '../models/database' );

const coleccionesPermitidas = [
	'usuarios',
	'categoria',
	'productos',
	'roles',
];

const buscarCategoria = async ( termino = '', res = response ) => {

	const isIdMongo = ObjectId.isValid( termino );
	
	if( isIdMongo ) {

		const category = await Category.findById( termino );

		return res.json( {
			response : category ? [ category ] : []
		} );

	} // end if

	const regex = new RegExp( termino, 'i' );

	const [ categoryByName, count ] = await Promise.all( [
		Category.find( {
			$or : [ { name: regex } ],
			$and : [ { state: true } ],
		} ),
		Category.countDocuments( { state: true } ),
	] );

	res.json( {
		count,
		response : categoryByName,
	} );

} // end function


const buscarProductos = async ( termino = '', res = response ) => {

	const isIdMongo = ObjectId.isValid( termino );
	
	if( isIdMongo ) {

		const product = await Product.findById( termino )
										.populate( 'category', 'name' );

		return res.json( {
			response : product ? [ product ] : []
		} );

	} // end if

	const regex = new RegExp( termino, 'i' );

	const [ productByName, count ] = await Promise.all( [
		Product.find( {
			$or : [ { name: regex }, { description: regex } ],
			$and : [ { state: true } ],
		} ).populate( 'category', 'name' ),
		Product.countDocuments( { state: true } ),
	] );

	res.json( {
		count,
		response : productByName,
	} );

} // end function

const buscarUsuarios = async ( termino = '', res = response ) => {

	const isIdMongo = ObjectId.isValid( termino );
	
	if( isIdMongo ) {

		const user = await User.findById( termino );

		return res.json( {
			response : user ? [ user ] : []
		} );

	} // end if

	const regex = new RegExp( termino, 'i' );

	const [ userByName, count ] = await Promise.all( [
		User.find( {
			$or : [ { name: regex }, { email: regex } ],
			$and : [ { state: true } ],
		} ),
		User.countDocuments( { state: true } ),
	] );

	res.json( {
		count,
		response : userByName,
	} );

} // end function

const searchCafe = ( req = request, res = response ) => {

	const { coleccion, termino } = req.params;

	if( ! coleccionesPermitidas.includes( coleccion ) )
		return res.status( 400 ).json({
			msg: `Las colecciones permitidas son:${ coleccionesPermitidas }`
		} );

	switch ( coleccion ) {
		
		case 'usuarios':
			buscarUsuarios( termino, res );
		break;
		case 'categoria':
			buscarCategoria( termino, res );
		break;
		case 'productos':
			buscarProductos( termino, res );
		break;
	
		default:
			res.status( 500 )
			.json({
				msg:"Aun no existe esta busqueda"
			})
		break;
	} // end switch

	
} // end function

module.exports = {
	searchCafe
}