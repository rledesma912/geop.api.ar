// modelo de usuario 

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var usuario = new Schema({
        email: String,
        nombre : String,
        apellido: String,
        direccion: String,
        aprobado: Boolean,
        activo : Boolean
    })

module.exports = mongoose.model('Usuario', usuario);

