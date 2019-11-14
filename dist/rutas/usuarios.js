"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = require("../controllers/userController");

/** Rutas de test */
var router = (0, _express.Router)();
/** Controladores */

/** Rutas */

/** Obtener todos los usuarios */
router.get('/', _userController.getAll);
/** Obtener usuario por id */

router.get('/:id', _userController.getOne);
/** registrar usuarios */

router.post('/register', _userController.register);
/** login usuarios */

router.post('/login', _userController.login);
/** consultar perfil */

router.get('/consulta', _userController.ensureToken, _userController.chequeoToken, _userController.consultaPerfil);
/** consultar usuarios deliverys de pedidos por userid */

router.get('/getDeliverysPorUsuario/:iduser', _userController.ensureToken, _userController.chequeoToken, _userController.getDeliverysPorUsuario);
/** consultar usuarios deliverys de pedidos por deliveryid */

router.get('/getUsuariosPorDelivery/:iddelivery', _userController.ensureToken, _userController.chequeoToken, _userController.getUsuariosPorDelivery);
/** Actualizar usuario*/

router.put('/:id', _userController.ensureToken, _userController.chequeoToken, _userController.updateUser);
/** Actualizar usuario*/

router["delete"]('/:id', _userController.ensureToken, _userController.chequeoToken, _userController.deleteUser);
/** Exporto */

var _default = router;
exports["default"] = _default;