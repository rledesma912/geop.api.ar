//TODO: implementar el trapeo de excepciones que está incompleto.
var UsuarioModel = require('../modelos/usuario');

exports.UsuariosListarTodos = function (req, res) {
  UsuarioModel.find(function (err, usus) {
    if (!err) res.send(usus)
    else
      console.log(`Error al listar los usuarios: ${err}`);

  })
};

exports.UsuarioPorId = function (req, res) {
  UsuarioModel.findById(req.params.id, function (err, unusuario) {
    if (!err) res.send(unusuario)
    else
      console.log(`Error al buscar usuario por Id: ${err}`);

  })
};

exports.UsuarioAgregar = function (req, res) {

  var usunuevo = new UsuarioModel({
    email: req.body.email,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    aprobado: false,
    activo: true
  });

  usunuevo.save(function (err) {
    if (!err) {
      console.log('Usuario guardado')
      res.send(usunuevo);
    } else {
      console.log('Error al guardar usuario + ' + err)
      res.send(err)
    }

  });
};

exports.UsuarioAprobar = function (req, res) {

  var query = {
    'email': req.params.email
  };

  UsuarioModel.findOneAndUpdate(query, {
      $set: {
        aprobado: true
      }
    }, {
      upsert: false
    },
    function (err, doc) {
      if (err)
        res.send(err);

      if (doc)
        res.send({
          message: '¡Usuario aprobado para comprar/pagar!'
        });
      else
        res.send({
          message: '¡Usuario no encontrado!'
        });

    });

}

exports.UsuarioModificar = function (req, res) {

  var query = {
    email: req.params.email
  };

  UsuarioModel.findOneAndUpdate(query, {
      $set: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion
      }
    }, {
      upsert: false
    },
    function (err, doc) {
      if (err)
        res.send(err);

      if (doc)
        res.send({
          message: '¡Usuario actualizado!'
        });
    });

}

//TODO: examinar si ya estaba deshabilitado para informar.
exports.UsuarioDeshabilitar = function (req, res) {

  UsuarioModel.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        activo: false
      }
    }, {
      upsert: false
    },
    function (err, doc) {
      if (err)
        res.send(err);

      if (doc)
        res.send({
          message: '¡Usuario deshabilitado!'
        });
      else
        res.send({
          message: '¡No se encuentra el registro!'
        });
    });

}

//Chequear activo y habilitado
exports.UsuarioPuedeComprar = function (req, res) {
  var query = {
    'email': req.params.email
  };

  UsuarioModel.findOne(query, function (err, unusuario) {
    if (!err) {
      if (unusuario != null) {
        if (unusuario.activo & unusuario.aprobado)
          res.send(`Puede comprar`)
        else
          res.send(`NO puede comprar`)
      } else
        res.send(`NO se encontró el usuario ${ req.params.email}`)
    } else
      console.log(`Error al buscar usuario por el email: ${err}`);

  })
};

//Chequear activo y habilitado
exports.PuedeComprar = function (email) {

  UsuarioModel.findOne({
    'email': email
  }, function (err, unusuario) {
    let mflag = false;

    if (!err)
      if (unusuario != null)
        if (unusuario.activo & unusuario.aprobado)
          mflag = true;

    console.log('nflag: ' + mflag);
    return mflag;
  })

};
