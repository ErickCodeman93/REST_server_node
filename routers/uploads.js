const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { cargarArchivo, updateImg, getImage, updateImgCloudinary, getImageCloudinary } = require('../controllers');
const { coleccionPermitidas } = require('../helpers');
const { validateJWT, validateFields, validateFile } = require( '../middlewares' );

const router = Router();

router.post( '/', [
	validateJWT,
	validateFile,
], cargarArchivo );

router.put( '/:coleccion/:id', [
	validateJWT,
	validateFile,
	check('id', 'No es un id valido').isMongoId(),
	check( 'coleccion' ).custom( c => coleccionPermitidas( c, [ 'usuarios', 'productos' ] ) ),
	validateFields,
// ], updateImg );
], updateImgCloudinary );

router.get( '/:coleccion/:id', [
	// validateJWT,
	check('id', 'No es un id valido').isMongoId(),
	check( 'coleccion' ).custom( c => coleccionPermitidas( c, [ 'usuarios', 'productos' ] ) ),
	validateFields,
// ], getImage );
], getImageCloudinary );

module.exports = router;