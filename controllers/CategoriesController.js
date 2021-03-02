const { response, request, json } = require( "express" );
const { paginationValidator } = require( "../helpers" );
const { Category } = require( "../models/database" );


//Obtener categorias - paginado - total - populate
const getCategories = async ( req = request, res = response ) => {

	let startPagination = 0;
	let endPagination = 0;
	const query = { state : true };

	if( Object.keys( req.query ).length ){

		const { from = 0, limit = 5 } = req.query;
		startPagination = paginationValidator( from );
		endPagination = paginationValidator( limit, true ); 

	} // end if


	const [ categories, total ] = await Promise.all([
		Category.find( query )
				.skip( startPagination ? startPagination : '' )
				.limit( endPagination ? startPagination : ''  )
				.populate( 'user', [ 'name', 'role' ] ),
		Category.countDocuments( query )
	]);

 	res.json({
		ok: true,
		status: '200',
		msg: 'get success',
		total,
		categories,
	 });

} // end function

//Obtener categoria - populate
const getCategory = async ( req = request, res = response ) => {

	const { id } = req.params;

	const user = await Category.findById( id )
								.populate( 'user', [ 'name', 'role' ] );

	res.json( {
		ok: true,
		status: '200',
		msg: 'get success',
		user,
	} );

} // end function

const postCategory = async ( req = request, res = response ) => {

	const name = req.body.name.toUpperCase();

	const categoria = await Category.findOne( { name } );

	if( categoria )
		return res.status( 400 )
					.json({
						msg: `La categoria ${ categoria.name } ya existe`
					});

	// Generar la data a Guardar

	const data = {
		name,
		user: req.user._id
	}

	const response = new Category( data );

	await response.save();

	res.status( 201 ).json({
		ok: true,
		status: '200',
		msg: 'post success',
		response,
	});

}

//Actualizar categoria 
const putCategory = async ( req = request, res = response ) => {

	const name = req.body.name.toUpperCase();
	const id = req.params.id;
	const user_id = req.user._id;
	const data = {
		name,
		user : user_id,
	};

	const response = await Category.findByIdAndUpdate( id, data, { new : true } );

	res.json({
		ok: true,
		status: '200',
		msg: 'put success',
		response,
	});

} // end function

//Delete categoria - 
const deleteCategory = async ( req = request, res = response ) => {

	const id = req.params.id;
	const data = { state: false }

	const response = await Category.findByIdAndUpdate( id, data, { new : true } );

	res.json({
		ok:true,
		status: '200',
		msg: 'delete success',
		response,
	});

} // end function

module.exports = {
	getCategories,
	getCategory,
	postCategory,
	putCategory,
	deleteCategory,
}
