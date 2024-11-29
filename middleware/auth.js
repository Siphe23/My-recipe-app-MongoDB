// middleware/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info to request object
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }
    next();
};
