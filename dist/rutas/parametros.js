"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _parametroController = require("../controllers/parametroController");

var _userController = require("../controllers/userController");

/** Rutas de test */
var router = (0, _express.Router)();
/** Controladores */

/** Rutas */

/* Obtener todos los parametros */
router.get('/all', _userController.ensureToken, _userController.chequeoToken, _parametroController.getAll);
/*borro parametro*/

router["delete"]('/:nombre', _userController.ensureToken, _userController.chequeoToken, _parametroController.deleteParametro);
/* update parametro*/

router.put('/', _userController.ensureToken, _userController.chequeoToken, _parametroController.updateParametro);
/* creo un parametro*/

router.post('/', _userController.ensureToken, _userController.chequeoToken, _parametroController.registrarParametro);
var _default = router;
exports["default"] = _default;