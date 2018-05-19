// modelo de venta con validaciones
var validator = require('validator');
var uuidv1 = require('uuid/v1');

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var venta = new Schema({
  uuid: {
    type: String,
    set: SetUuid,
    required : true
  },
  user_email: {
    type: String,
    validate: [validator.isEmail, {
      'message': 'Formato de email no válido'
    }],
    required: true,
    lowercase: true 
  },
  amount: {
    type: Number,
    required: true,
    /*get: GetDinero,
    set: SetDinero*/
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  anulada: {
    type: Boolean,
    default: false
  }  
})

// Validar si el usaurio está habilitado
venta.pre('save', function (next) { 

  next();
});

function GetDinero(num) {  
  return num * 100;  
};

function SetDinero(num) {
  return (num / 100).toFixed(2);
};

function SetUuid(num) {
  return uuidv1();
};
module.exports = mongoose.model('venta', venta);
