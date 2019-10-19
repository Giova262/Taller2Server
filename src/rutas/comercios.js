import {Router} from 'express'

const router = Router()

    /** Controladores */

import {  
    getAll } from '../controllers/comercioController';


import { 
     ensureToken,chequeoToken
    } from '../controllers/userController';


/** Rutas */
/** Obtener todos los productos */
router.get('/all', ensureToken,chequeoToken,getAll );


export default router