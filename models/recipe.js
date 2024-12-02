import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String }, // Optionally store the image URL or base64 data
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
