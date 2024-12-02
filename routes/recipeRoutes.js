import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

router.get('/recipes', recipeController.getRecipes);
router.post('/recipes', recipeController.createRecipe);
router.put('/recipes/:id', recipeController.updateRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);

export default router;
