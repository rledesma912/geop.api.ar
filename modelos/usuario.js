// modelo de usuario con validaciones
var validator = require('validator');

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var usuario = new Schema({
  email: {
    type: String,
    unique : true,
    lowercase: true,
    validate: [validator.isEmail, {
      'message': 'Formato de email no válido'
    }]
  },
  nombre: {
    type: String,
    required: true,
    lowercase: true 
  },
  apellido: {
    type: String,
    required: true,
    lowercase: true 
  },
  direccion: String,
  aprobado: Boolean,
  activo: Boolean
})

usuario.pre('save', function (next) {
  const user = this;  
  // Aca también puedo validar existencia del email  
  next();
});

module.exports = mongoose.model('Usuario', usuario);
