//TODO: implementar el trapeo de excepciones que está incompleto.
var VentaModel = require('../modelos/venta');
var UsuarioModel = require('../modelos/usuario');
var CtrlDeUsuario = require('../controladores/usuario');

exports.VentaAgregar = function (req, res) {

  try {

    var ventanueva = new VentaModel({
      uuid: 'default',
      user_email: req.body.user_email,
      amount: req.body.amount
    });

    UsuarioModel.findOne({
      'email': req.body.user_email
    }, function (err, unusuario) {

      if (!err)
        if (unusuario != null)
          if (unusuario.activo & unusuario.aprobado)

            //esta aprobado =>  guardo la venta
            ventanueva.save(function (err) {
              if (!err) {
                console.log('Venta guardada')
                res.send(ventanueva);
              } else {
                console.log('Error al generar la venta + ' + err)
                res.send(err)
              }

            });

    })

  } catch (err) {
    res.send(err);
  }
};

exports.VentaAnular = function (req, res) {
  
  VentaModel.findOneAndUpdate({
      '_id': req.body.id
    }, {
      $set: {
        anulada: true
      }
    }, {
      upsert: false
    },
    function (err, doc) {
      if (err)
        res.send(err);

        console.log('documento: ' + doc)
      if (doc)
        res.send({
          message: 'Venta anulada'
        });
      else
        res.send({
          message: '¡No se encuentra la venta solicitada!'
        });
    });

}

exports.VentasPorUsuario = function (req, res) {

  VentaModel.find({ 'user_email': req.params.email }, function (err, usus) {
    if (!err) res.send(usus)
    else
      console.log(`Error al listar los usuarios: ${err}`);

  })
};

exports.VentasGrilla = function (req, res) {

  VentaModel.find({ 'user_email': req.params.email }, function (err, usus) {
    if (!err) res.send(usus)
    else
      console.log(`Error al listar los usuarios: ${err}`);

  })
};