const { Schema, model } = require( 'mongoose' );

const CategorySchema = Schema({
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
	}
});

// Modifica la propiedad de password para no regresarla en el enpoint
CategorySchema.methods.toJSON = function () {

	const { __v, state, ...data } = this.toObject();
	return data;
}

module.exports = model( 'Category', CategorySchema );