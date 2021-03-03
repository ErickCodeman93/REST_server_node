const { request, response } = require("express");
//Models
const { Product } = require("../models/database");
// Helpers
const { 
	capitalizeText, 
	paginationValidator, 
	isMongoIdVerify,
	idCategoryValidatorController } = require( '../helpers' );

const getProducts = async ( req = request , res = response ) => {

	const query = { state : true };
	let startPagination = 0;
	let endPagination = 0;

	if( Object.keys( req.query ).length ){

		const { from = 0, limit = 5 } = req.query;
		startPagination = paginationValidator( from );
		endPagination = paginationValidator( limit, true ); 

	} // end if

	const [ products, count ] = await Promise.all( [
		Product.find( query )
				.populate( 'user',[ 'name', 'role' ] )
				.populate( 'category',[ 'name' ] )
				.skip( startPagination )
				.limit( endPagination ),
		Product.countDocuments( query )
	] );

	res.json({
		ok: true,
		status: '200',
		msg: 'success',
		count,
		products,
	});

} // end function

const getProduct = async ( req = request , res = response ) => {

	const { id } = req.params;

	const product = await Product.findById( id )
								.populate( 'user',[ 'name', 'role' ] )
								.populate( 'category',[ 'name' ] );

	if( ! product.available )
		return res.status( 400 )
					.json({
						msg: 'El producto fue dado de baja',
					});

	res.json({
		ok: true,
		status: '200',
		msg: 'success',
		product,
	});

} // end function

const postProduct = async ( req = request , res = response ) => {

	const { state, available, ...data } = req.body;
	const { _id : id } = req.user;

	const name = capitalizeText( data.name );

	let product = await Product.findOne( { name } );							

	if( product )
		return res.status( 400 )
					.json({
						msg: 'El producto ya existe en la base de datos.'
					});

	data.name = name;
	data.user = id;

	const response = new Product( data );

	await response.save();
	
	res.status( 201 ).json({
		ok: true,
		status: '200',
		msg: 'success',
		response
	});

} // end function

const putProduct = async ( req = request , res = response ) => {

	const { id } = req.params;
	const { user, state, ...data } = req.body;

	if( data.name )
		data.name = capitalizeText( data.name );

	data.user = req.user._id;

	try {
		
		if( data.category ){

			if( ! isMongoIdVerify( data.category ) || ! await idCategoryValidatorController( data.category ) )
				res.status( 400 )
				.json( {
					msg: "La categoria a actualizar es invalida"
				} );
		} // end if

		const productUpdate = await Product.findByIdAndUpdate( id, data, { new: true } )
											.populate( 'category',[ 'name' ] );

		res.json({
			ok: true,
			status: '200',
			msg: 'success',
			productUpdate
		});
		
	} // try 
	catch ( error ) {
		console.log( error );

		res.status( 500 ).json({
			msg: 'Contactar al administrador'
		});

	} // catch

} // end function

const deleteProduct = async ( req = request , res = response ) => {

	const { id } = req.params;

	const productDelete = await Product.findByIdAndUpdate( id, { state : false }, { new: true } );

	res.json({
		ok: true,
		status: '200',
		msg: 'success',
		productDelete
	});

} // end function


module.exports = {
	getProduct,
	getProducts,
	postProduct,
	putProduct,
	deleteProduct,
}