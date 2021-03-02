const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { 
	postCategory, 
	getCategory, 
	getCategories, 
	putCategory, 
	deleteCategory } = require( '../controllers' );

const { idCategoryValidator } = require( '../helpers' );

const { 
	validateJWT, 
	validateFields, 
	adminRole } = require( '../middlewares' );

const router = Router();

// Obtener todas las categorias - publico 
router.get( '/' , getCategories );

// Obtener una categoria - publico 
router.get( '/:id' ,[
	check( 'id', 'Se necesita un id valido' ).isMongoId().custom( idCategoryValidator ),
	validateFields
] , getCategory );

// Crear categoria - privado - cualquier persona con un token valido 
router.post( '/' ,[ 
	validateJWT,
	check( 'name','El nombre de la categoria es obligatorio' ).not().isEmpty(),
	validateFields 
], postCategory);

// Actualiuzar categoria - privado - cualquier persona con un token valido 
router.put( '/:id' , [
	validateJWT,
	check( 'id', 'Se necesita un id valido' ).isMongoId().custom( idCategoryValidator ),
	check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
	validateFields, 
] , putCategory );

// Delete categoria - ADMIN - cualquier persona con un token valido 
router.delete( '/:id' ,[
	validateJWT,
	check( 'id', 'Se necesita un id valido' ).isMongoId().custom( idCategoryValidator ),
	validateFields,
	adminRole 
] , deleteCategory );

module.exports = router;
