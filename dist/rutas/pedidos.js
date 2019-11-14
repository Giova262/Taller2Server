"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _pedidoController = require("../controllers/pedidoController");

var _userController = require("../controllers/userController");

var router = (0, _express.Router)();
/* Controladores 
seguramente falten.
*/

/* Rutas */

/*obtener todos los pedidos*/
router.get('/all', _userController.ensureToken, _userController.chequeoToken, _pedidoController.all);
/* Obtengo el precio del envio antes de dar el registro del mismo en pendiente*/

router.get('/getPrecioEnvio', _userController.ensureToken, _userController.chequeoToken, _pedidoController.getPrecioEnvio);
/* Obtengo el porcentaje del envio para el delivery*/

router.get('/getPorcentajeDelivery', _userController.ensureToken, _userController.chequeoToken, _pedidoController.getPorcentajeDelivery);
/* registrarPedido */

router.post('/registrarPedido', _userController.ensureToken, _userController.chequeoToken, _pedidoController.registrarPedido);
/* Obtener pedido por idUsuario */

router.get('/getPedidosUsuario/:idUsuario', _userController.ensureToken, _userController.chequeoToken, _pedidoController.getPedidosUsuario);
/* Obtener pedido por idDelivery */

router.get('/getPedidosDelivery/:idDelivery', _userController.ensureToken, _userController.chequeoToken, _pedidoController.getPedidosDelivery);
/* Obtener pedidos cercanos al Delivery */

router.get('/getPedidosPendientesParaDelivery/:lati&:longi', _userController.ensureToken, _userController.chequeoToken, _pedidoController.getPedidosPendientesParaDelivery);
/* setear pedido tomad por idDelivery */

router.post('/asignarPedidoADelivery/', _userController.ensureToken, _userController.chequeoToken, _pedidoController.asignarPedidoADelivery);
/** Obtener Historial del delivery*/

router.get('/getHistorialDelivery/:idDelivery', _userController.ensureToken, _userController.chequeoToken, _pedidoController.getPedidosHistorialDelivery);
/** Pedido entregado */

router.put('/', _userController.ensureToken, _userController.chequeoToken, _pedidoController.updatePedido);
/* delete pedido*/

router["delete"]('/:id', _userController.ensureToken, _userController.chequeoToken, _pedidoController.deletePedido);
/* Exporto */

var _default = router;
exports["default"] = _default;