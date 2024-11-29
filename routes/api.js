// routes/api.js
import express from 'express';
import recipeController from './controllers/recipeController.js';

const router = express.Router();

// Register routes and bind them to the corresponding controller functions
router.get('/recipes', recipeController.getRecipes); // Get all recipes
router.post('/recipes', recipeController.createRecipe); // Create a new recipe
router.put('/recipes/:id', recipeController.updateRecipe); // Update a recipe by ID
router.delete('/recipes/:id', recipeController.deleteRecipe); // Delete a recipe by ID

export default router;
