// routes/suggestions.js
import { Router } from 'express';
import { 
    createSuggestion, listSuggestions, approveSuggestion, rejectSuggestion, 
    getUserSuggestions, updateSuggestion, deleteSuggestion
} from '../controllers/suggestionController.js';

import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, authorizeRoles('Usuario', 'Administrador'), createSuggestion);

router.get('/', authenticate, authorizeRoles('Empleado', 'Administrador'), listSuggestions);
router.get('/mis', authenticate, authorizeRoles('Usuario', 'Administrador'), getUserSuggestions);

router.put('/:id', authenticate, authorizeRoles('Usuario'), updateSuggestion);
router.put('/:id/aprobar', authenticate, authorizeRoles('Administrador', 'Empleado'), approveSuggestion);
router.put('/:id/rechazar', authenticate, authorizeRoles('Administrador', 'Empleado'), rejectSuggestion);

router.delete('/:id', authenticate, authorizeRoles('Usuario', 'Administrador'), deleteSuggestion);

export default router;
