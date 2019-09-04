const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
	//autorizacion por header
	const authHeader = req.get('Authorization');

	if(!authHeader){
		const error = new Error('No hay json JWT');
		error.statusCode = 401;
		throw error;
	}

	//obtener el token y verificar
	const token = authHeader.split(' ')[1];
	let revisarToken;
	try{
		
		revisarToken = jwt.verify(token,'SUPER');
	}catch(error){
		error.statusCode = 500;
		throw error;
	}

	//si es valido pero hay error
	if (!revisarToken) {
		const error = new Error('No autenticado');
		error.statusCode = 401;
		throw error;
	}

	next();
}
