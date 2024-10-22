const express = require('express');
const { registerUser, verifyJWT } = require('../services/authService');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await registerUser(email, password);
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}); 

// example of a protected route
router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

module.exports = router;