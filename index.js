const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});

//Cors permite que un cliente se conecte a nuestro servidor para intercambiar recursos
const cors = require('cors');


//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{useNewUrlParser: true});

//crear el servidor
const app = express();

//carpeta publica
app.use(express.static('uploads'));


//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//definir dominio para recibir peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions ={
	origin: (origin,callback)=>{
		//revisar si la peticion que llega esta en la lista blanca
		const existe = whiteList.some(dominio=>dominio === origin);
		if(existe){
			callback(null,true);
		}else{
			callback(new Error('No permitido por CORS'))
		}
	}
}

//Habilitar cors
app.use(cors(corsOptions));

//Rutas de la app
app.use('/',routes());


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//puerto
app.listen(port,host,()=>{
	console.log('El servidor corre')
})