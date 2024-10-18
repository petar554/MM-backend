// server/config/db.js

const { Pool } = require('pg');
require('dotenv').config(); // load environment variables from .env file

// pool of connections to PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER, 
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
  max: 10, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;
