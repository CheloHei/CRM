const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async(req,res)=>{

	const usuario = new Usuarios(req.body);
	usuario.password = await bcrypt.hash(req.body.password,12);
	try{
		await usuario.save();
		res.json({mensaje:'Usuario creado correctamente'})
	}catch(error){
		console.log(error);
		res.json({mensaje:'Hubo un error'});
	}
}


exports.autenticarUsuario = async (req,res,next)=>{
	//buscar el usuario
	const {email,password} = req.body
	const usuario = await Usuarios.findOne({email});
	if (!usuario) {
		//si no existe
		await res.status(401).json({mensaje:'Ese usuario no existe'});
		next();
	}else{
		//el user existe verificar si el password es correcto o incorrecto
		if (!bcrypt.compareSync(password,usuario.password)) {
			//si el pass es incorrecto
			await res.status(401).json({mensaje:'Password incorrecto'});
			next();
		}else{
			//pass correcto,firmar el token
			const token = jwt.sign({
				email:usuario.email,
				nombre: usuario.nombre,
				id: usuario._id
			},
			'SUPER',
			{
				expiresIn : '1h'
			}
			);

			//retornar token
			res.json({token});
		}
	}
}