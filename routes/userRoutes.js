// Routes for user-related operations
import { Router } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

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

// POST /api/users/login - Authenticate a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }
        // Put only safe info in the token payload for security
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token, user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;