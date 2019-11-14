import {Router} from 'express'

const router = Router()
   

 /* Controladores 
	seguramente falten.
*/
import { all,
		 getPrecioEnvio,
		 getPorcentajeDelivery,
		 registrarPedido,
		 getPedidosUsuario,
		 getPedidosDelivery,
		 getPedidosPendientesParaDelivery,
		 asignarPedidoADelivery,
		 getPedidosHistorialDelivery,
		 updatePedido,
		 deletePedido
        } from '../controllers/pedidoController';

import { 
	    ensureToken,chequeoToken
	   } from '../controllers/userController';
   
   
/* Rutas */
/*obtener todos los pedidos*/
router.get('/all',ensureToken,chequeoToken,all);

/* Obtengo el precio del envio antes de dar el registro del mismo en pendiente*/
router.get('/getPrecioEnvio',ensureToken,chequeoToken,getPrecioEnvio);

/* Obtengo el porcentaje del envio para el delivery*/
router.get('/getPorcentajeDelivery',ensureToken,chequeoToken,getPorcentajeDelivery);

/* registrarPedido */
router.post('/registrarPedido',ensureToken,chequeoToken,registrarPedido);

/* Obtener pedido por idUsuario */
router.get('/getPedidosUsuario/:idUsuario',ensureToken,chequeoToken, getPedidosUsuario);

/* Obtener pedido por idDelivery */
router.get('/getPedidosDelivery/:idDelivery',ensureToken,chequeoToken, getPedidosDelivery);

/* Obtener pedidos cercanos al Delivery */
router.get('/getPedidosPendientesParaDelivery/',ensureToken,chequeoToken, getPedidosPendientesParaDelivery);

/* setear pedido tomad por idDelivery */
router.post('/asignarPedidoADelivery/',ensureToken,chequeoToken, asignarPedidoADelivery);

/** Obtener Historial del delivery*/
router.get('/getHistorialDelivery/:idDelivery',ensureToken,chequeoToken, getPedidosHistorialDelivery);

/** Pedido entregado */
router.put('/',ensureToken,chequeoToken,updatePedido);

/* delete pedido*/
router.delete('/:id',ensureToken,chequeoToken, deletePedido);


 /* Exporto */
export default router
