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
		default: 'USER_ROLE',
		required: [ true, 'Role is required' ],
		// enum:[ 'ADMIN_ROLE', 'USER_ROLE' ],
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

// Modifica la propiedad de password para no regresarla en el enpoint
UsuarioSchema.methods.toJSON = function () {

	const { __v, password, _id, ...user } = this.toObject();

	user.uid = _id;

	return user;
}

module.exports = model( 'User' ,UsuarioSchema );