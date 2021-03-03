const { Router } = require( 'express' );
const { searchCafe } = require( '../controllers' );

const router = Router();

router.get( '/:coleccion/:termino', searchCafe )

module.exports = router;