import { Router } from 'express';
import { listAllIngredients, createIngredients, updateIngredient, deleteIngredient } from '../controllers/ingredientController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorizeRoles('Usuario', 'Empleado', 'Administrador'), listAllIngredients);

// Sin uso actual
router.post('/', authenticate, authorizeRoles('Empleado', 'Administrador'), createIngredients);
router.put('/:id', authenticate, authorizeRoles('Empleado', 'Administrador'), updateIngredient);
router.delete('/:id', authenticate, authorizeRoles('Administrador'), deleteIngredient);

export default router;
