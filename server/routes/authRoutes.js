const express = require('express');
const { registerUser, loginUser, loginWithGoogle, verifyJWT } = require('../services/authService');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await registerUser(email, password);
        console.log(user);
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}); 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await loginUser(email, password);
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login/google', async (req, res) => {
    const { idToken } = req.body;
    try {
        const { user, token } = await loginWithGoogle(idToken);
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// protected route
router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

module.exports = router;