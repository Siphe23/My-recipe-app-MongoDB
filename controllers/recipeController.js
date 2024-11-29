// controllers/recipeController.js
import Recipe from '../models/Recipe.js'; // Ensure this import is correct

const recipeController = {
  // Get all recipes
  getRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find(); // Fetch all recipes
      res.json(recipes); // Send the recipes as a JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recipes' });
    }
  },

  // Create a new recipe
  createRecipe: async (req, res) => {
    const { name, ingredients, instructions, image } = req.body;
    try {
      const newRecipe = new Recipe({ name, ingredients, instructions, image });
      await newRecipe.save(); // Save the recipe in the database
      res.status(201).json(newRecipe); // Return the newly created recipe
    } catch (error) {
      res.status(500).json({ message: 'Error creating recipe' });
    }
  },

  // Update a recipe by ID
  updateRecipe: async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, instructions, image } = req.body;
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, { name, ingredients, instructions, image }, { new: true });
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(updatedRecipe); // Return the updated recipe
    } catch (error) {
      res.status(500).json({ message: 'Error updating recipe' });
    }
  },

  // Delete a recipe by ID
  deleteRecipe: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting recipe' });
    }
  },
};

export default recipeController;
