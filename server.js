//Microservicion de ejercicio
var path = require('path');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//log middleware para testearlo
var logger = require('morgan');

//aplicacion express
var app = express();

//log de errores
app.use(logger('combined'))

var port = process.env.PORT || 3000;

//Configuración:
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// route saludo
var routeTest = express.Router();
routeTest.get('/', function (req, res) {
  res.json({
    message: 'Microservicio gEoPaGos corriendo ¡Saludos!'
  });
});

// API routes
var routesUsuarios = require('./routes/usuarios.js');
app.use('/apigeo', [routesUsuarios, routeTest]);
  
//conecto con mongo
mongoose.connect('mongodb://localhost/pagosweb', function (err, res) {
  if (err)
    console.log('Error en la conección con mongodb')
  else
    console.log('Conección con db correcta')
})


app.listen(port);
console.log('API escuchando en el puerto:' + port);
