// src/controllers/usuario.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import bcrypt from "bcrypt";

// =============================
// CREAR USUARIO
// =============================
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol, estado } = req.body;

    // 🔥 Validaciones
    if (!nombre || !email || !password) {
      return errorResponse(
        res,
        "Nombre, email y password  son obligatorios",
        400,
      );
    }

    // 🔥 Verificar si ya existe el email
    const existe = await pool.query("SELECT * FROM usuario WHERE email = $1", [
      email,
    ]);

    if (existe.rows.length > 0) {
      return errorResponse(res, "El email ya está registrado", 400);
    }

    // 🔥 Encriptar password
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuario 
      (nombre, email, password , rol, estado)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_usuario, nombre, email, rol, estado`,
      [nombre, email, hash, rol, estado],
    );

    successResponse(res, result.rows[0], "Usuario creado correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR USUARIOS
// =============================
export const listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_usuario, nombre, email, rol, estado FROM usuario ORDER BY id_usuario DESC",
    );

    successResponse(res, result.rows, "Usuarios obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER USUARIO POR ID
// =============================
export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT id_usuario, nombre, email, rol, estado FROM usuario WHERE id_usuario = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Usuario no encontrado", 404);

    successResponse(res, result.rows[0], "Usuario encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR USUARIO
// =============================
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol, estado } = req.body;

    let hash = password;

    // 🔥 Si envían nueva password  → encriptar
    if (password) {
      hash = await bcrypt.hash(password, 10);
    }

    const result = await pool.query(
      `UPDATE usuario
       SET nombre = $1,
           email = $2,
           password  = $3,
           rol = $4,
           estado = $5
       WHERE id_usuario = $6
       RETURNING id_usuario, nombre, email, rol, estado`,
      [nombre, email, hash, rol, estado, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Usuario no encontrado", 404);

    successResponse(res, result.rows[0], "Usuario actualizado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR USUARIO
// =============================
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM usuario WHERE id_usuario = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Usuario no encontrado", 404);

    successResponse(res, null, "Usuario eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
