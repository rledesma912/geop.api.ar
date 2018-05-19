var express = require('express');
var router = express.Router();

// Importo el controlador
var UsuarioCtrl = require('../controladores/usuario');
var VentaCtrl = require('../controladores/ventas');

//crear usuario valida formato de email / existencia en la colección
router.post('/usuario', UsuarioCtrl.UsuarioAgregar)

//Encontrar por Id
router.get('/usuario/:id', UsuarioCtrl.UsuarioPorId)

//Aprobar usuario 
router.get('/usuario/aprobar/:email', UsuarioCtrl.UsuarioAprobar)

//Modificar usuario por mails y campos a modificar
router.put('/usuario/:email', UsuarioCtrl.UsuarioModificar)

//Deshabilitar usuario por id
router.put('/usuario/desactivar/:id', UsuarioCtrl.UsuarioDeshabilitar)

//Listar todos los usuarios
router.get('/usuarios', UsuarioCtrl.UsuariosListarTodos)

/******* ventas */
//TODO: después modularizarla
//El usuario hizo una compra | venta por usuario
router.post('/usuario/venta', VentaCtrl.VentaAgregar)

router.put('/venta/anular', VentaCtrl.VentaAnular)

router.get('/ventas/grilla', VentaCtrl.VentasGrilla)

router.get('/ventas/usuario/:email', VentaCtrl.VentasPorUsuario)

router.get('/usuario/check/:email', UsuarioCtrl.UsuarioPuedeComprar)


module.exports = router;
