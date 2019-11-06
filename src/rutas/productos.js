   /** Rutas de test */

   import {Router} from 'express'

   const router = Router()
   
       /** Controladores */
   
   import {  
       getAll,
       getProductosPorComercio,
       getProductosPorPedido
       } from '../controllers/productoController';
   
   
   import { 
	    ensureToken,chequeoToken
	   } from '../controllers/userController';


/** Rutas */
   /** Obtener todos los productos */
   router.get('/all', ensureToken,getAll );
   
   /* Obtengo los productos de un idcomercio*/
   router.get('/productosPorComercio/:idcomercio',ensureToken, getProductosPorComercio);
   
   /* Obtengo los productos de un idpedido*/
   router.get('/productosPorPedido/:idpedido',ensureToken, getProductosPorPedido);
   

   export default router