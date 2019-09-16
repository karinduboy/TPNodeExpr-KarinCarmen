//modulos que usaré en mi servidor
const express = require ('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./modules/router');

//variables que usan los módulos
const server = express();
const port = 3000; //defino el puerto donde quiero ejecutar el servidor

server.use(
	bodyParser.urlencoded({
		extended: true
	})
);
server.use(bodyParser.json());

//comienzo a definir la funcionalidad de mi servidor
server.use(router); 
server.use(express.static('public'));
server.use(logger('dev'));
server.use(cors);

server.listen(port, () =>{
    console.log(`escuchando desdel el puerto:${port}`) //esto lo hago como prueba para que me muestre que está corriendo el server
});