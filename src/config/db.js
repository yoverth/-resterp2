// src/config/db.js

import dotenv from "dotenv";
dotenv.config(); // ⚠ ESTO DEBE IR PRIMERO

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: String(process.env.DB_PASSWORD), // 🔥 FORZAMOS STRING
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
});
