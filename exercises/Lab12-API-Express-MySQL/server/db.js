//server/db.js
/**
 * Capa: conexión a MySQL.
 * Crea un pool reutilizable con credenciales de `.env` (DB_HOST, DB_USER, etc.).
 * Los repositorios ejecutan SQL a través de `pool`, no abren conexiones sueltas en cada ruta.
 */
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = { pool };
