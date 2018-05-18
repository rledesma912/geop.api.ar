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
    if (!err)
      console.log('Usuario guardado')
    else
      console.log('Error al guardar usuario + ' + err)
  });

  res.send(usunuevo);

};

exports.UsuarioAprobar = function (req, res) {

  var query = {
    email: req.params.email
  };

  UsuarioModel.findOneAndUpdate(query, {
      $set: {
        aprobado: true
      }
    }, {
      upsert: true
    },
    function (err, doc) {
      if (err)
        res.send(err);

      return res.json({
        message: '¡Usuario aprobado para comprar/pagar!'
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
      upsert: true
    },
    function (err, doc) {
      if (err)
        res.send(err);

      return res.json({
        message: '¡Usuario actualizado!'
      });
    });

}

exports.UsuarioDeshabilitar = function (req, res) {

  UsuarioModel.findOneAndUpdate({
      id: req.params.id
    }, {
      $set: {
        activo: false
      }
    }, {
      upsert: true
    },
    function (err, doc) {
      if (err)
        res.send(err);

      return res.json({
        message: '¡Usuario deshabilitado!'
      });
    });

}
