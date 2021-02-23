const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/UserControllers');
const { validateFields } = require('../middlewares/validate.fields');

const router = Router();

router.get( '/', getUsers );

router.post( '/',  [
    check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria y debe tener mínimo 6 caracteres').isLength({min: 6}),
    check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
],postUsers );

router.put( '/:id', putUsers );

router.patch( '/:id', putUsers );

router.delete( '/:id', deleteUsers );

module.exports = router;
