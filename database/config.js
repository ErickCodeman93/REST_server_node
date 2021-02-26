const mongoose = require( 'mongoose' );
const { insertRoles } = require( '../seeders/RolesSedders' );

const dbConnection = async () => {

	try {
		
		await mongoose.connect( process.env.CONNECTION_DB,{
			useNewUrlParser: true, 
			useUnifiedTopology: true,
			useCreateIndex:true,
			useFindAndModify:false,
		} );

		console.log( 'Data base online' );	
		// insertRoles();	

	} // End try
	catch (error) {
		throw new Error( 'Error to connection to data base' );	
	} //End catch
} //End function


module.exports = {
	dbConnection,
}