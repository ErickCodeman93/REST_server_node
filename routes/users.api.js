const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/UserControllers');

const router = Router();

router.get( '/', getUsers );

router.post( '/', postUsers );

router.put( '/:id', putUsers );

router.patch( '/:id', putUsers );

router.delete( '/:id', deleteUsers );

module.exports = router;
