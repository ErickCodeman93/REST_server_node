const AuthController = require( './AuthController' );
const CategoriesController = require( './CategoriesController' );
const UserController = require( './UserControllers' );
const ProductsController = require( './ProductsController' );

module.exports = {
	...AuthController,
	...CategoriesController,
	...UserController,
	...ProductsController,
}