import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TreinoCheck',
  password: 'pabd',
  port: 5432,
});

export default pool;
