const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'holaMundo04',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'puntoventa'
});

module.exports = pool;