import { Router } from 'express';

const router = Router();

// Temporary test route to send back a simple response
router.post('/register', (req, res) => {
    res.json({ youSent: req.body });
});

export default router;