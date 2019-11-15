import {Router} from 'express'

const router = Router()

    /** Controladores */

import {  
    getAll,
    deleteComercio,
    updateComercio,
    registrarComercio,
 } from '../controllers/comercioController';


import { 
     ensureToken,chequeoToken
    } from '../controllers/userController';


/** Rutas */

/* Obtener todos los comercios */
router.get('/', ensureToken,chequeoToken,getAll );

 /* delete comercio*/
 router.delete('/:id',ensureToken,chequeoToken, deleteComercio);

 /* update comercio*/
 router.put('/',ensureToken,chequeoToken,updateComercio);

 /* creo un comercio*/
 router.post('/', ensureToken,chequeoToken,registrarComercio);

export default router