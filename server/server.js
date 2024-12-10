const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const intentionRoutes = require('./routes/intentionRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// routes
app.use('/auth', authRoutes);                
app.use('/intentions', intentionRoutes);     
app.use('/media', mediaRoutes);              

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
