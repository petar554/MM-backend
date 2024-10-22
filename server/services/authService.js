const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const firebaseAdmin = require('firebase-admin');
const config = require('../config');
const JWT_SECRET = process.env.JWT_SECRET;

// initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
});

const generateJWT = (user) => {
    return jwt.sign({id: user, email: user.email}, JWT_SECRET, { expiresIn : '1h' });
}

const registerUser = async (email, password) => {
    const existingUser = await User.findOne({ where: { email }});
    if (existingUser) throw new Error('User already exist!')

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return { user: newUser, token: generateJWT(newUser)};
}

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });

        req.user = decoded;  // Attach user info to the request object
        next();
    });
};

module.exports = { registerUser, verifyJWT }