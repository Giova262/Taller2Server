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
router.get('/all', _userController.ensureToken, _pedidoController.all);
/* Obtengo el precio del envio antes de dar el registro del mismo en pendiente*/

router.get('/getPrecioEnvio', _userController.ensureToken, _pedidoController.getPrecioEnvio);
/* registrarPedido */

router.post('/registrarPedido', _userController.ensureToken, _pedidoController.registrarPedido);
/* Obtener pedido por idUsuario */

router.get('/getPedidosUsuario/:idUsuario', _userController.ensureToken, _pedidoController.getPedidosUsuario);
/* Obtener pedido por idDelivery */

router.get('/getPedidosDelivery/:idDelivery', _userController.ensureToken, _pedidoController.getPedidosDelivery);
/* Obtener pedidos cercanos al Delivery */

router.get('/getPedidosPendientesParaDelivery/', _userController.ensureToken, _pedidoController.getPedidosPendientesParaDelivery);
/* setear pedido tomad por idDelivery */

router.post('/asignarPedidoADelivery/', _userController.ensureToken, _pedidoController.asignarPedidoADelivery);
/* Exporto */

var _default = router;
exports["default"] = _default;