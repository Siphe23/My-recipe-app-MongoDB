import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import recipeRoutes from './routes/api.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/database.js'; // Default import without curly braces

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to the database
connectDB();

// Authentication Routes
app.use('/api/auth', authRoutes); // Register auth routes (e.g., registration, login)

// Recipe Routes
app.use('/api', recipeRoutes); // Recipe routes (e.g., get, post recipes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
