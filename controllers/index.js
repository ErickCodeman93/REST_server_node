const AuthController = require( './AuthController' );
const CategoriesController = require( './CategoriesController' );
const UserController = require( './UserControllers' );
const ProductsController = require( './ProductsController' );
const SearchController = require( './SearchController' );
const UploadsController = require( './UploadsController' )

module.exports = {
	...AuthController,
	...CategoriesController,
	...UserController,
	...ProductsController,
	...SearchController,
	...UploadsController,
}