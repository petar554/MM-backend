const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const intentionRoutes = require('./routes/intentionRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const goalRoutes = require('./routes/goalRoutes');
const knowledgeRoutes = require('./routes/knowledgeRoutes');
const happinessRoutes = require('./routes/happinessRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// routes
app.use('/auth', authRoutes);                
app.use('/intention', intentionRoutes);     
app.use('/media', mediaRoutes);
app.use('/goal', goalRoutes);              
app.use('/knowledge', knowledgeRoutes);              
app.use('/happiness', happinessRoutes);              
app.use('/summary', summaryRoutes);              

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
