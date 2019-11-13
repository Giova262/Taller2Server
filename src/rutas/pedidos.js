import {Router} from 'express'

const router = Router()
   

 /* Controladores 
	seguramente falten.
*/
import { all,
	     getPrecioEnvio,
		 registrarPedido,
		 getPedidosUsuario,
		 getPedidosDelivery,
		 getPedidosPendientesParaDelivery,
		 asignarPedidoADelivery,
		 getPedidosHistorialDelivery,
		 updatePedido
        } from '../controllers/pedidoController';

import { 
	    ensureToken,chequeoToken
	   } from '../controllers/userController';
   
   
/* Rutas */
/*obtener todos los pedidos*/
router.get('/all',ensureToken,all);

/* Obtengo el precio del envio antes de dar el registro del mismo en pendiente*/
router.get('/getPrecioEnvio',ensureToken,getPrecioEnvio);

/* registrarPedido */
router.post('/registrarPedido',ensureToken,registrarPedido);

/* Obtener pedido por idUsuario */
router.get('/getPedidosUsuario/:idUsuario',ensureToken, getPedidosUsuario);

/* Obtener pedido por idDelivery */
router.get('/getPedidosDelivery/:idDelivery',ensureToken, getPedidosDelivery);

/* Obtener pedidos cercanos al Delivery */
router.get('/getPedidosPendientesParaDelivery/',ensureToken, getPedidosPendientesParaDelivery);

/* setear pedido tomad por idDelivery */
router.post('/asignarPedidoADelivery/',ensureToken, asignarPedidoADelivery);

/** Obtener Historial del delivery*/
router.get('/getHistorialDelivery/:idDelivery',ensureToken, getPedidosHistorialDelivery);

/** Pedido entregado */
router.put('/',ensureToken,updatePedido);

 /* Exporto */
export default router
