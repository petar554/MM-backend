const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const firebaseAdmin = require('firebase-admin');
const config = require('../config/config');

const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require('../models'); 

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
});

const generateJWT = (user) => {
    return jwt.sign({id: user, email: user.email}, JWT_SECRET, { expiresIn : '1h' });
}

const registerUser = async (email, password, first_name, last_name, username, date_of_birth, city, country) => {
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw new Error('User already exists!');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            first_name,
            last_name,
            username,
            email,
            date_of_birth,
            password_hash: hashedPassword,
            city,
            country
        });

        const token = generateJWT(newUser);

        const userResponse = {
            user_id: newUser.user_id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            username: newUser.username,
            date_of_birth: newUser.date_of_birth,
            city: newUser.city,
            country: newUser.country,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        return { user: userResponse, token };
    } catch (error) {
        throw error;  
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.dataValues.password_hash);
        if (!isMatch) throw new Error('Invalid credentials');

        return { user, token: generateJWT(user) };
    } catch (error) {
        throw error;
    }
};

const loginWithGoogle = async (idToken) => {
    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        const email = decodedToken.email;
    
        let user = await User.findOne({ where: { email } });
        if (!user) {
            user = await User.create({ email, passwordHash: null }); 
        }
    
        return { user, token: generateJWT(user) };
    } catch (error) {
        throw error;
    }
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