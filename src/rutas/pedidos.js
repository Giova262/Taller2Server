import {Router} from 'express'

const router = Router()
   

 /* Controladores 
	seguramente falten.
*/
import { all,
	     getPorcentajeDelivery,
	     getPrecioEnvio,
		 getPedidosUsuario,
		 getPedidosDelivery,
		 getPedidosPendientesParaDelivery,
		 asignarPedidoADelivery,
		 registrarPedido,
		 deletePedido,
		 updatePedido
        } from '../controllers/pedidoController';

import { 
	    ensureToken,chequeoToken
	   } from '../controllers/userController';
   
   
/* Rutas */
/*obtener todos los pedidos*/
router.get('/all',ensureToken,chequeoToken,all);

/* Obtengo el porcenaje del envio para del delivery*/
router.get('/getPrecioEnvio',ensureToken,chequeoToken,getPorcentajeDelivery);

/* Obtengo el precio del envio antes de dar el registro del mismo en pendiente*/
router.get('/getPorcentajeDelivery',ensureToken,chequeoToken,getPrecioEnvio);

/* registrarPedido */
router.post('/registrarPedido',ensureToken,chequeoToken,registrarPedido);

/* Obtener pedido por idUsuario */
router.get('/getPedidosUsuario/:idUsuario',ensureToken,chequeoToken, getPedidosUsuario);

/* Obtener pedido por idDelivery */
router.get('/getPedidosDelivery/:idDelivery',ensureToken,chequeoToken, getPedidosDelivery);

/* Obtener pedidos cercanos al Delivery */
router.get('/getPedidosPendientesParaDelivery/',ensureToken,chequeoToken, getPedidosPendientesParaDelivery);

/* setear pedido toma por idDelivery */
router.post('/asignarPedidoADelivery/',ensureToken,chequeoToken, asignarPedidoADelivery);

/* delete pedido*/
router.delete('/',ensureToken,chequeoToken, deletePedido);

/* update pedido*/
router.put('/',ensureToken,chequeoToken,updatePedido);

 /* Exporto */
export default router
