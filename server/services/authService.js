const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); 
const firebaseAdmin = require('firebase-admin');
const config = require('../config/config');
const JWT_SECRET = process.env.JWT_SECRET;

// initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
});

const generateJWT = (user) => {
    return jwt.sign({id: user, email: user.email}, JWT_SECRET, { expiresIn : '1h' });
}

const registerUser = async (email, password) => {
    try {
        const existingUser = await User.findOne({ where: { email }});
        if (existingUser) throw new Error('User already exist!')

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, passwordHash: hashedPassword });

        return { user: newUser, token: generateJWT(newUser)};
    } catch (error) {
        throw error;
    }
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid credentials');

    return { user, token: generateJWT(user) };
};

const loginWithGoogle = async (idToken) => {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    let user = await User.findOne({ where: { email } });
    if (!user) {
        user = await User.create({ email, passwordHash: null }); 
    }

    return { user, token: generateJWT(user) };
};

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });

        req.user = decoded;
        next();
    });
};

module.exports = { registerUser, verifyJWT, loginUser, loginWithGoogle }