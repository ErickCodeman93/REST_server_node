const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const router = Router();

router.get( '/', ( req, res ) => {

	res.json({
		msg: 'ok products'
	});
} );

module.exports = router;