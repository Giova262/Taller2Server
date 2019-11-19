"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _comercioController = require("../controllers/comercioController");

var _userController = require("../controllers/userController");

var router = (0, _express.Router)();
/** Controladores */

/** Rutas */

/* Obtener todos los comercios */
router.get('/', _userController.ensureToken, _userController.chequeoToken, _comercioController.getAll);
/* delete comercio*/

router["delete"]('/:id', _userController.ensureToken, _userController.chequeoToken, _comercioController.deleteComercio);
/* update comercio*/

router.put('/', _userController.ensureToken, _userController.chequeoToken, _comercioController.updateComercio);
/* creo un comercio*/

router.post('/register', _userController.ensureToken, _userController.chequeoToken, _comercioController.registrarComercio);
var _default = router;
exports["default"] = _default;