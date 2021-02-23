const mongoose = require('mongoose');

const dbConnection = async () => {

	try {
		
		await mongoose.connect( process.env.CONNECTION_DB,{
			useNewUrlParser: true, 
			useUnifiedTopology: true
		} );

		console.log( 'Data base online' );		

	} // End try
	catch (error) {
		throw new Error( 'Error to connection to data base' );	
	} //End catch
} //End function


module.exports = {
	dbConnection,
}