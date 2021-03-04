const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( archivo, extencionesValidas = [ 'png','jpg','jpeg', 'gif' ], folder = '' ) => {

	return new Promise( ( resolve, reject ) => {

		const nameCut = archivo.name.split( '.' );
		const extencion = nameCut[ nameCut.length - 1 ];
		
		if( ! extencionesValidas.includes( extencion ) )
			return reject( { msg : `La extencion ${ extencion } no es valida`} );

		
		const nombreFinal = uuidv4() + '.' + extencion; 

		const uploadPath = path.join( __dirname, '../uploads/', folder, nombreFinal );
	
		archivo.mv( uploadPath, (err) => {

			if (err) 
				return reject( { err } );
		
			resolve( nombreFinal );
		});

	} );

} // end function

module.exports = {
	uploadFile,
}