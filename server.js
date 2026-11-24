// Load articles needed for the server
import 'dotenv/config';
import express from 'express';

// Create the app
const app = express();

// Middleware to turn JSON bodies into JS objects
app.use(express.json());

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

