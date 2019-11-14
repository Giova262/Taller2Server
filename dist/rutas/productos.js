"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productoController = require("../controllers/productoController");

var _userController = require("../controllers/userController");

/** Rutas de test */
var router = (0, _express.Router)();
/** Controladores */

/** Rutas */

/** Obtener todos los productos */
router.get('/all', _userController.ensureToken, _userController.chequeoToken, _productoController.getAll);
/* Obtengo los productos de un idcomercio*/

router.get('/productosPorComercio/:idcomercio', _userController.ensureToken, _userController.chequeoToken, _productoController.getProductosPorComercio);
/* Obtengo los productos de un idpedido*/

router.get('/productosPorPedido/:idpedido', _userController.ensureToken, _userController.chequeoToken, _productoController.getProductosPorPedido);
/* delete producto*/

router["delete"]('/:id', _userController.ensureToken, _userController.chequeoToken, _productoController.deleteProducto);
/* update producto*/

router.put('/', _userController.ensureToken, _userController.chequeoToken, _productoController.updateProducto);
/* creo un producto*/

router.post('/', _userController.ensureToken, _userController.chequeoToken, _productoController.registrarProducto);
var _default = router;
exports["default"] = _default;