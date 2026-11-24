// Load packages needed for the server
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// Create the app
const app = express();

// Connect to the database
connectDB();

// Middleware to turn JSON bodies into JS objects
app.use(express.json());

// Every route in userRoutes starts with /api/users
app.use('/api/users', userRoutes);

// Set the port
const PORT = process.env.PORT || 3000;

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Innovate Inc. auth API is running!'});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

