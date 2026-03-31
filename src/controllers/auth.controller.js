// src/controllers/auth.controller.js

import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "123456789";

// =============================
// LOGIN
// =============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT * FROM usuario WHERE email = $1 AND estado = TRUE`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = result.rows[0];

    // 🔐 comparar password  correctamente
    const valido = await bcrypt.compare(password, usuario.password);

    if (!valido) {
      return res.status(401).json({ message: "password  incorrecta" });
    }

    // 🔥 generar token con id
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        rol: usuario.rol,
      },
      SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// REGISTRO
// =============================
export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // 🔹 validar rol
    if (rol !== "admin" && rol !== "cajero") {
      return res.status(400).json({
        message: "El rol debe ser admin o cajero",
      });
    }

    // 🔥 verificar si ya existe un admin
    if (rol === "admin") {
      const existeAdmin = await pool.query(
        "SELECT * FROM usuario WHERE rol = 'admin'",
      );

      if (existeAdmin.rows.length > 2) {
        return res.status(400).json({
          message: "Ya existe un usuario administrador",
        });
      }
    }

    // 🔍 verificar email
    const existe = await pool.query("SELECT * FROM usuario WHERE email = $1", [
      email,
    ]);

    if (existe.rows.length > 0) {
      return res.status(400).json({
        message: "Email ya registrado",
      });
    }

    // 🔐 encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuario
       (nombre, email, password, rol, estado)
       VALUES ($1, $2, $3, $4, TRUE)
       RETURNING id_usuario, nombre, email, rol`,
      [nombre, email, hash, rol],
    );

    res.status(201).json({
      message: "Usuario registrado",
      usuario: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// PERFIL (CORREGIDO 🔥)
// =============================
export const perfil = async (req, res) => {
  try {
    // 🔥 validar token
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const { id } = req.user;

    const result = await pool.query(
      `SELECT id_usuario, nombre, email, rol
       FROM usuario WHERE id_usuario = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// LOGOUT
// =============================
export const logout = (req, res) => {
  res.json({ message: "Logout exitoso" });
};
