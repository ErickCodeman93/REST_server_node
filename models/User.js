const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

	name:{
		type: String,
		required: [ true, 'Name is required' ],

	},
	email:{
		type: String,
		required: [ true, 'Email is required' ],
		unique: true,	
	},
	password:{
		type: String,
		required: [ true, 'Password is required' ],
	},
	image:{
		type: String,
	},
	role:{
		type: String,
		required: [ true, 'Role is required' ],
		enum:[ 'ADMIN_ROLE', 'USER_ROLE' ],
	},
	state:{
		type: Boolean,
		default: true,
	},
	google:{
		type: Boolean,
		default: false,
	},
});


module.exports = model( 'User' ,UsuarioSchema );