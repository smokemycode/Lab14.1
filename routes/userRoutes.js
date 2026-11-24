// Routes for user-related operations
import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with that email already exists.' });
        }
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;