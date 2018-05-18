var express = require('express');
var router = express.Router();

// Importo el controlador
var UsuarioCtrl = require('../controladores/usuario');

//crear usuario TODO: validar formato de email
router.post('/usuario', UsuarioCtrl.UsuarioAgregar)

//Encontrar por Id
router.get('/usuario/:id', UsuarioCtrl.UsuarioPorId)

//Aprobar usuario 
router.put('/usuario/:email', UsuarioCtrl.UsuarioAprobar)

//Modificar usuario por mails y campos a modificar
router.put('/usuario/:email', UsuarioCtrl.UsuarioModificar)

//Deshabilitar usuario por id
router.put('/usuario/:id', UsuarioCtrl.UsuarioDeshabilitar)

//Listar todos los usuarios
router.get('/usuarios', UsuarioCtrl.UsuariosListarTodos)







module.exports = router;
