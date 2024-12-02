import express from 'express';
import jwt from 'jsonwebtoken';
import User from './models/User'; // Assuming you have a User model
import Recipe from './models/Recipe';  // Assuming you have a Recipe model

const app = express();

// Middleware to parse JSON body
app.use(express.json());  

// Middleware to verify the token
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from Authorization header
    if (!token) {
        return res.status(403).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret
        req.user = decoded;  // Attach user data to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
};

// Middleware to check user role
export const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) { // Check if the user has the required role
        return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }
    next(); // Continue to the next middleware if role matches
};

// POST route for login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
});

// POST route for creating a recipe (with token verification and role check)
app.post('/api/v1/recipes', verifyToken, checkRole('admin'), async (req, res) => {
    try {
        const { name, ingredients, instructions } = req.body;
        
        if (!name || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newRecipe = new Recipe({
            name,
            ingredients,
            instructions,
            createdBy: req.user.userId,
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error: error.message });
    }
});

export default app;
