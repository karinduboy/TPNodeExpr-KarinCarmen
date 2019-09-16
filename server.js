//modulos que usaré en mi servidor
const express = require ('express');
const router = require('./modules/router'); //aqui llamo el módulo propio de mi proyecto por eso la ruta es diferente a las dependencias de node_modules
const logger = require('morgan');//con esto podemos monitorear el status de las acciones que ejecutamos con nuestro servidor-middleware

//variables que usan los módulos
const server = express()
const port = 3000; //defino el puerto donde quiero ejecutar el servidor

//comienzo a definir la funcionalidad de mi servidor

server.use(router); //aquí le indico al server que use el módulo router
server.use(express.static('public'));//esto me permite decirle al servidor la ubicación de los archivos estaticos y así mantengo las rutass relativas que hice en los html
server.use(logger('dev'))

server.listen(port, () =>{
    console.log(`escuchando desdel el ${port}`) //esto lo hago como prueba para que me muestre que está corriendo el server
})