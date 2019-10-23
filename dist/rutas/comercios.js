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

/** Obtener todos los productos */
router.get('/all', _userController.ensureToken, _comercioController.getAll);
var _default = router;
exports["default"] = _default;