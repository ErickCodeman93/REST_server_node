const path = require( 'path' );
const fs = require( 'fs' );
const { request, response } = require( "express" );
const { uploadFile } = require("../helpers");
const { Product, User } = require( "../models/database" );

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const cargarArchivo = async ( req = request ,res = response ) => {
  
	try {

		// const nameFile = await uploadFile( req.files.archivo );
		// const nameFile = await uploadFile( req.files.archivo, [ 'txt', 'md' ], 'textos' );
		const nameFile = await uploadFile( req.files.archivo, undefined, 'img' );

		res.json({
			nameFile,
		});

	} //end try 
	catch (error) {
		
		res.status( 400 ).json({
			msg: error
		})
	} // end catch

} // end function

const updateImg = async ( req = request, res = response ) => {

	const { coleccion, id } = req.params;

	let modelo;

	switch ( coleccion ) {
		case 'usuarios':

			modelo = await User.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de usuario: ${ id } no existe en la base de datos`
							});

			

			break;
		case 'productos':

			modelo = await Product.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de producto: ${ id } no existe en la base de datos`
							});

			
				break;
	
		default:
			return res.status( 500 )
						.json({
							msg: 'Hombres trabajando en eso!!'
						});
	} //end switch

	//Limpiar imagenes previas
	if( modelo.image ){

		// borrar imagen del servidor
		const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.image );

		if( fs.existsSync( pathImagen ) )
			fs.unlinkSync( pathImagen );

	} //end if


	modelo.image = await uploadFile( req.files.archivo, undefined, coleccion );

	await modelo.save();
	
	res.json({
		modelo,
	});

} // end function

const updateImgCloudinary = async ( req = request, res = response ) => {

	const { coleccion, id } = req.params;

	let modelo;

	switch ( coleccion ) {
		case 'usuarios':

			modelo = await User.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de usuario: ${ id } no existe en la base de datos`
							});

			

			break;
		case 'productos':

			modelo = await Product.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de producto: ${ id } no existe en la base de datos`
							});

			
				break;
	
		default:
			return res.status( 500 )
						.json({
							msg: 'Hombres trabajando en eso!!'
						});
	} //end switch

	//Limpiar imagenes previas
	if( modelo.image ){

		const nombreArr = modelo.image.split( '/' );
		const nombre = nombreArr[ nombreArr.length - 1 ];
		const [ public_id ] = nombre.split( '.' );

		// await cloudinary.uploader.destroy( public_id );
		cloudinary.uploader.destroy( public_id );
	
	} //end if

	const { tempFilePath } = req.files.archivo
	const response = await cloudinary.uploader.upload( tempFilePath );
	const { secure_url } = response;

	modelo.image = secure_url;

	await modelo.save();
	
	res.json({
		modelo
	});

} // end function

const getImage = async ( req = request ,res = response ) => {

	const { coleccion, id } = req.params;

	let modelo;

	switch ( coleccion ) {
		case 'usuarios':

			modelo = await User.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de usuario: ${ id } no existe en la base de datos`
							});

			

			break;
		case 'productos':

			modelo = await Product.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de producto: ${ id } no existe en la base de datos`
							});

			
				break;
	
		default:
			return res.status( 500 )
						.json({
							msg: 'Hombres trabajando en eso!!'
						});
	} //end switch

	//Limpiar imagenes previas
	if( modelo.image ){

		// borrar imagen del servidor
		const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.image );

		if( fs.existsSync( pathImagen ) )
			return res.sendFile( pathImagen );

	} //end if

	const pathImagenNotFound = path.join( __dirname, '../public/assets/img/no-image.jpg',);

	res.sendFile(
		pathImagenNotFound
	);

} // end function

const getImageCloudinary = async ( req = request ,res = response ) => {

	const { coleccion, id } = req.params;

	let modelo;

	switch ( coleccion ) {
		case 'usuarios':

			modelo = await User.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de usuario: ${ id } no existe en la base de datos`
							});

			

			break;
		case 'productos':

			modelo = await Product.findById(id );

			if( !modelo )
				return res.status( 400 )
							.json({
								msg: `El id de producto: ${ id } no existe en la base de datos`
							});

			
				break;
	
		default:
			return res.status( 500 )
						.json({
							msg: 'Hombres trabajando en eso!!'
						});
	} //end switch

	//Limpiar imagenes previas
	if( modelo.image )
			return res.json( modelo.image );

	const pathImagenNotFound = path.join( __dirname, '../public/assets/img/no-image.jpg',);

	res.json(
		pathImagenNotFound
	);

} // end function

module.exports = {
	cargarArchivo,
	updateImg,
	updateImgCloudinary,
	getImage,
	getImageCloudinary,
}