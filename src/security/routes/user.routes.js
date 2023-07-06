import { Router } from 'express';
import { getUsers, userRegistration, getUser, userUpdate } from '../controllers/user.controller.js'
import { verifyToken } from '../controllers/auth.controller.js';

const router = Router();

router.post('/', userRegistration)
router.get('/', verifyToken, getUsers)
router.get('/:idUser', verifyToken, getUser)
router.put('/:idUser', verifyToken, userUpdate)

export default router;