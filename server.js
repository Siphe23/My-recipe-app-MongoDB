import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import router from "./routes/api.js";
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipeRoutes.js';
import Recipe from './models/Recipe';  


const app = express();
const PORT = process.env.PORT || 8080;

// Connect to the database
connectDB();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(recipeRoutes);    // route middleware

// Routes
app.use('/api/auth', authRoutes);

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch recipes from the database
        res.json(recipes); // Return the fetched recipes
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes' });
    }
});

// Mount API routes on /api/v1
app.use('/api/v1', router);

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
