import {Router} from 'express'

const router = Router()

    /** Controladores */

import {  
    getAll,
    deleteComercio,
    updateComercio,
    registrarComercio,
    getOne
 } from '../controllers/comercioController';


import { 
     ensureToken,chequeoToken
    } from '../controllers/userController';


/** Rutas */

/* Obtener todos los comercios */
router.get('/', ensureToken,chequeoToken,getAll );

/* Obtener comercio por id */
router.get('/:id', ensureToken,chequeoToken,getOne );

 /* delete comercio*/
 router.delete('/:id',ensureToken,chequeoToken, deleteComercio);

 /* update comercio*/
 router.put('/:id',ensureToken,chequeoToken,updateComercio);

 /* creo un comercio*/
 router.post('/register', ensureToken,chequeoToken,registrarComercio);

export default router