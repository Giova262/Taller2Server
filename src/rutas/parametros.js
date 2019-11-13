   /** Rutas de test */

   import {Router} from 'express'

   const router = Router()
   
    /** Controladores */
   import {  
       getAll,
       deleteParametro,
       updateParametro,
       registrarParametro
       } from '../controllers/parametroController';
   
   
   import { 
	    ensureToken,chequeoToken
	   } from '../controllers/userController';


/** Rutas */
   /* Obtener todos los parametros */
   router.get('/all', ensureToken,chequeoToken,getAll );
   
   /*borro parametro*/
   router.delete('/',ensureToken,chequeoToken, deleteParametro);

   /* update parametro*/
   router.put('/',ensureToken,chequeoToken,updateParametro);
  
   /* creo un parametro*/
   router.post('/', ensureToken,chequeoToken,registrarParametro);
   
   export default router