import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';  // Assuming User model is in this location

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });  // Find user by email

        if (!user) {
            return res.status(400).json({ error: 'User not found' });  // If user not found, return error
        }

        const isMatch = await user.comparePassword(password);  // Assuming comparePassword method in user model

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });  // Invalid password
        }

        // Generate JWT token with expiration time (e.g., 24 hours)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ token });  // Send the token to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });  // Catch and handle errors
    }
});

export default router;
