const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

//Controllers
const { 
	getProduct, 
	getProducts, 
	postProduct, 
	putProduct, 
	deleteProduct } = require('../controllers');

// MiddleWares
const { validateFields, validateJWT, adminRole } = require('../middlewares');

// Helpers 
const { idCategoryValidator, idProductValidator } = require( '../helpers' );

const router = Router();

router.get( '/', getProducts );

router.get( '/:id',[
check( 'id', 'El id no es reconocido' ).custom( idProductValidator ).isMongoId(),
validateFields
], getProduct );

router.post( '/',[
validateJWT,
check( 'name', 'El nombre es necesario' ).not().isEmpty(),
check( 'price', 'El precio es necesario' ).not().isEmpty(),
check( 'category', 'La categoría invalida' ).custom( idCategoryValidator ).isMongoId(),
validateFields
], postProduct );

router.put( '/:id',[
validateJWT,
check( 'id', 'el id no es reconocido' ).custom( idProductValidator ).isMongoId(),
// check( 'category', 'La categoría invalida' ).custom( idCategoryValidator ).isMongoId(),
// check( 'name', 'El nombre es necesario' ).not().isEmpty(),	
validateFields
], putProduct );

router.delete( '/:id',[
validateJWT,
check( 'id', 'el id no es reconocido' ).custom( idProductValidator ).isMongoId(),
validateFields,
adminRole
], deleteProduct );

module.exports = router;