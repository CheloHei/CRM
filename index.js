const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis',{useNewUrlParser:true});

//crear el servidor
const app = express();

//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Rutas de la app
app.use('/',routes());

//puerto
app.listen(5000)