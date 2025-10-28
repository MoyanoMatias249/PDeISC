// routes/users.js
import { Router } from 'express';
import {
  getUsers,
  deleteUser,
  updateUserRole
} from '../controllers/userController.js';

import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorizeRoles('Administrador'), getUsers);
router.delete('/:id', authenticate, authorizeRoles('Administrador'), deleteUser);
router.put('/:id/rol', authenticate, authorizeRoles('Administrador'), updateUserRole);

export default router;
