const { Schema, model } = require( 'mongoose' );

const ProductSchema = Schema({
	name:{
		type: String,
		required: [ true, 'El nombre es obligatorio de la categoria' ]
	},
	state:{
		type: Boolean,
		required:  true,
		default: true,
	},
	user:{
		type: Schema.Types.ObjectId,
		ref:'User',
		required:  true,
	},
	price:{
		type: Number,
		default: 0,
	},
	category:{
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	description: { type: String, default: '' },
	available: { type: Boolean, default: true }
});

// Modifica la propiedad de password para no regresarla en el enpoint
ProductSchema.methods.toJSON = function () {

	const { __v, state, ...data } = this.toObject();
	return data;
}

module.exports = model( 'Producto', ProductSchema );