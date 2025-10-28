// routes/recipes.js
import { Router } from 'express';
import { 
    listRecipes, filterRecipesByIngredients, searchRecipesByName, getRecetaPorId,
    createRecipe, updateRecipe, deleteRecipe, 
    likeRecipe, getLikedRecipes, removeLike, 
    getRecetasDelUsuario, listDrafts, approveRecipe
} from '../controllers/recipeController.js';

import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/mis', authenticate, authorizeRoles('Usuario', 'Administrador', 'Empleado'), getRecetasDelUsuario);
router.get('/liked', authenticate, authorizeRoles('Usuario'), getLikedRecipes);
router.get('/drafts', authenticate, authorizeRoles('Administrador'), listDrafts);
router.get('/search', authenticate, authorizeRoles('Usuario', 'Empleado', 'Administrador'), searchRecipesByName);
router.post('/filter', authenticate, authorizeRoles('Usuario', 'Empleado', 'Administrador'), filterRecipesByIngredients);

router.get('/', authenticate, authorizeRoles('Usuario', 'Empleado', 'Administrador'), listRecipes);
router.get('/:id', authenticate, authorizeRoles('Usuario', 'Empleado', 'Administrador'), getRecetaPorId);

router.post('/', authenticate, authorizeRoles('Empleado', 'Administrador'), createRecipe);
router.put('/:id', authenticate, authorizeRoles('Empleado', 'Administrador'), updateRecipe);
router.delete('/:id', authenticate, authorizeRoles('Administrador'), deleteRecipe);

router.post('/:id/like', authenticate, authorizeRoles('Usuario'), likeRecipe);
router.delete('/:id/like', authenticate, authorizeRoles('Usuario'), removeLike);
router.put('/:id/aprobar', authenticate, authorizeRoles('Administrador'), approveRecipe);

export default router;
