const dbValidators = require( './dbValidators' );
const encryptPWS = require( './encryptPWS' );
const generateJWT = require( './generateJWT' );
const googleVerify = require( './googleVerify' );
const generalFunction = require( './generalFunction' );
const uploadFile = require( './uploadsFile' );

module.exports = {
	...dbValidators,
	...encryptPWS,
	...generateJWT,
	...googleVerify,
	...generalFunction,
	...uploadFile
}