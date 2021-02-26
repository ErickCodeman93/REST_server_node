const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateJWT,
    validateFields,
    adminRole,
    permissionRole,
 } = require( '../middlewares' );

const { 
    getUsers, 
    postUsers, 
    putUsers, 
    deleteUsers } = require('../controllers/UserControllers');

const { 
    roleValidator, 
    emailValidator, 
    idValidator } = require('../helpers/dbValidators');

const router = Router();

router.get( '/', [ 
    validateJWT 
], getUsers );

router.post( '/',  [
    validateJWT,
    check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail().custom( emailValidator ),
    check('password', 'La contraseña es obligatoria y debe tener mínimo 6 caracteres').isLength({min: 6}),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check( 'role' ).custom( roleValidator ),
    validateFields,
    permissionRole( [ 'ADMIN_ROLE', 'VENTAS_ROLE' ] )
], postUsers );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'No es un id valido' ).isMongoId().custom( idValidator ),
    check( 'role' ).custom( roleValidator ),
    validateFields,
    permissionRole( [ 'ADMIN_ROLE', 'VENTAS_ROLE' ] )
],putUsers );

router.patch( '/:id', putUsers );

router.delete( '/:id', [
    validateJWT,
    check( 'id', 'No es un id valido' ).isMongoId().custom( idValidator ),
    validateFields,
    adminRole
],deleteUsers );

module.exports = router;
