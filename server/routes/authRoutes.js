const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginWithGoogle, verifyJWT} = require('../services/authService');
const { handleValidationErrors, registerValidationRules, loginValidationRules, googleLoginValidationRules } = require('../utils/validationRules');

router.post(
    '/register',
    registerValidationRules(),
    handleValidationErrors,
    async (req, res) => {
        const { email, password, first_name, last_name, username, date_of_birth, city, country} = req.body;

        try {
            const { user, token } = await registerUser(
                email,
                password,
                first_name,
                last_name,
                username,
                date_of_birth,
                city,
                country
            );
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

router.post(
    '/login',
    loginValidationRules(),
    handleValidationErrors,
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const { user, token } = await loginUser(email, password);
            res.json({ user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

router.post(
    '/login/google',
    googleLoginValidationRules(),
    handleValidationErrors,
    async (req, res) => {
        const { idToken } = req.body;

        try {
            const { user, token } = await loginWithGoogle(idToken);
            res.json({ user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// protected route
router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

module.exports = router;