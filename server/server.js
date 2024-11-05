const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

app.use('/', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
