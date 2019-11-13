   
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
    updateUser,
    deleteUser
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
router.get('/consulta',ensureToken,chequeoToken,consultaPerfil);

/** consultar usuarios deliverys de pedidos por userid */
router.get('/deliverysPorUsuario/:iduser',ensureToken,chequeoToken, getDeliverysPorUsuario);

/** consultar usuarios deliverys de pedidos por deliveryid */
router.get('/usuariosPorDelivery/:iddelivery',ensureToken,chequeoToken, getUsuariosPorDelivery);

/** Actualizar usuario*/
router.put('/',ensureToken,chequeoToken, updateUser );

/** borrar usuario*/
router.delete('/',ensureToken,chequeoToken, deleteUser);


/** Exporto */

export default router