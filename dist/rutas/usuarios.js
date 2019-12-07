/** Rutas de test */
import { Router } from 'express';
const router = Router();
/** Controladores */

import { getAll, register, login, consultaPerfil, ensureToken, getOne, chequeoToken, getDeliverysPorUsuario, getUsuariosPorDelivery, updateUser, deleteUser, getUsuariosTop10, getDeliverysTop10 } from '../controllers/userController';
/** Rutas */

/** Obtener todos los usuarios */

router.get('/', getAll);
/** Obtener usuario por id */

router.get('/:id', getOne);
/** registrar usuarios */

router.post('/register', register);
/** login usuarios */

router.post('/login', login);
/** consultar perfil */

router.get('/consulta', ensureToken, chequeoToken, consultaPerfil);
/** consultar usuarios deliverys de pedidos por userid */

router.get('/getDeliverysPorUsuario/:iduser', ensureToken, chequeoToken, getDeliverysPorUsuario);
/** consultar usuarios deliverys de pedidos por deliveryid */

router.get('/getUsuariosPorDelivery/:iddelivery', ensureToken, chequeoToken, getUsuariosPorDelivery);
/** Actualizar usuario*/

router.put('/:id', ensureToken, chequeoToken, updateUser);
/** Actualizar usuario*/

router.delete('/:id', ensureToken, chequeoToken, deleteUser);
/** usuarios top 10 */

router.get('/Top10Users', ensureToken, chequeoToken, getUsuariosTop10);
/** deliveries top 10 */

router.get('/Top10Deliverys', ensureToken, chequeoToken, getDeliverysTop10);
/** Exporto */

export default router;