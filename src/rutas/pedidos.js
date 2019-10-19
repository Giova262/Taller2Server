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
		 asignarPedidoADelivery
        } from '../controllers/pedidoController';

import { 
	    ensureToken,chequeoToken
	   } from '../controllers/userController';
   
   
/* Rutas */
/*obtener todos los pedidos*/
router.get('/all',ensureToken,chequeoToken,all);

/* Obtengo el precio del envio antes de dar el registro del mismo en pendiente*/
router.get('/getPrecioEnvio',ensureToken,chequeoToken,getPrecioEnvio);

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


 /* Exporto */
export default router
