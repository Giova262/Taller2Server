import { Router } from 'express';
const router = Router();
/* Controladores 
seguramente falten.
*/

import { all, getPrecioEnvio, getPorcentajeDelivery, registrarPedido, getPedidosUsuario, getPedidosDelivery, getPedidosPendientesParaDelivery, getPedidosPendientes, getPedidosAsignados, getPedidosCancelados, asignarPedidoADelivery, getPedidosHistorialDelivery, updatePedido, deletePedido, getTotalFacturadoUsuario, getTotalFacturadoDelivery } from '../controllers/pedidoController';
import { ensureToken, chequeoToken } from '../controllers/userController';
/* Rutas */

/*obtener todos los pedidos*/

router.get('/all', ensureToken, chequeoToken, all);
/*obtener facturado id usuario*/

router.get('/TotalFacturadoUsuario/:id', ensureToken, chequeoToken, getTotalFacturadoUsuario);
/*obtener facturado id delivery*/

router.get('/TotalFacturadoDelivery/:id', ensureToken, chequeoToken, getTotalFacturadoDelivery);
/*obtener todos los pedidos pendientes*/

router.get('/Pendientes', ensureToken, chequeoToken, getPedidosPendientes);
/*obtener todos los pedidos asignados*/

router.get('/Asignados', ensureToken, chequeoToken, getPedidosAsignados);
/*obtener todos los pedidos asignados*/

router.get('/Cancelados', ensureToken, chequeoToken, getPedidosCancelados);
/* Obtengo el precio del envio antes de dar el registro del mismo en pendiente*/

router.get('/getPrecioEnvio', ensureToken, chequeoToken, getPrecioEnvio);
/* Obtengo el porcentaje del envio para el delivery*/

router.get('/getPorcentajeDelivery', ensureToken, chequeoToken, getPorcentajeDelivery);
/* registrarPedido */

router.post('/registrarPedido', ensureToken, chequeoToken, registrarPedido);
/* Obtener pedido por idUsuario */

router.get('/getPedidosUsuario/:idUsuario', ensureToken, chequeoToken, getPedidosUsuario);
/* Obtener pedido por idDelivery */

router.get('/getPedidosDelivery/:idDelivery', ensureToken, chequeoToken, getPedidosDelivery);
/* Obtener pedidos cercanos al Delivery */

router.get('/getPedidosPendientesParaDelivery/:lati&:longi', ensureToken, chequeoToken, getPedidosPendientesParaDelivery);
/* setear pedido tomad por idDelivery */

router.post('/asignarPedidoADelivery/', ensureToken, chequeoToken, asignarPedidoADelivery);
/** Obtener Historial del delivery*/

router.get('/getHistorialDelivery/:idDelivery', ensureToken, chequeoToken, getPedidosHistorialDelivery);
/** Pedido entregado */

router.put('/', ensureToken, chequeoToken, updatePedido);
/**  delete pedido**/

router.delete('/:id', ensureToken, chequeoToken, deletePedido);
/* Exporto */

export default router;