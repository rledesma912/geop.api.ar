//Microservicion de ejercicio
var path = require('path');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//routes
var routes = require('./routes/index');

//modelos
var users = require('./models/usuario');

//log middleware para testearlo
var logger = require('morgan');

//aplicacion express
var app = express(); 

//log de errores
app.use(logger('combined'))

var port = process.env.PORT || 3000;

//Configuración:
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mi router
var router = express.Router(); 

//recurso de prueba
router.get('/', function(req, res) {
    res.json({ message: 'Microservicio gEoPaGos corriendo ¡Saludos!' });   
});

//el hostname de la restful
app.use('/apigeo', router);

app.listen(port);
console.log('API escuchando en el puerto:' + port);


