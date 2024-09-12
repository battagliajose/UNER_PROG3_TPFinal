import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

export const pool = createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    port: process.env.MYSQLPORT,
    database: process.env.DATABASE,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS
});