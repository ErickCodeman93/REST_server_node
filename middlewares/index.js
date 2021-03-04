const validateJWT = require('../middlewares/validate.jwt');
const validateFields = require('../middlewares/validate.fields');
const validateRoles = require('../middlewares/validate.roles');
const validateFiles = require( '../middlewares/validate.file' );

module.exports = {
	...validateJWT,
	...validateFields,
	...validateRoles,
	...validateFiles,
}