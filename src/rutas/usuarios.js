   
   /** Rutas de test */

import {Router} from 'express'

const router = Router()

    /** Controladores */

import {  
    getAll,
    register,
    login,
    consultaPerfil,
    ensureToken,
    getOne,
    chequeoToken,
    getDeliverysPorUsuario,
    getUsuariosPorDelivery,
    updateUser
    } from '../controllers/userController';

    /** Rutas */

/** Obtener todos los usuarios */
router.get('/', getAll );

/** Obtener usuario por id */
router.get('/:id', getOne );

/** registrar usuarios */
router.post('/register', register );

/** login usuarios */
router.post('/login', login );

/** consultar perfil */
router.get('/consulta',ensureToken,consultaPerfil);

/** consultar usuarios deliverys de pedidos por userid */
router.get('/getDeliverysPorUsuario/:iduser',ensureToken, getDeliverysPorUsuario);

/** consultar usuarios deliverys de pedidos por deliveryid */
router.get('/getUsuariosPorDelivery/:iddelivery',ensureToken, getUsuariosPorDelivery);

/** Actualizar usuario*/
router.put('/:id',ensureToken, updateUser );



/** Exporto */

export default router