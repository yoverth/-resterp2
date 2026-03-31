// src/controllers/proveedor.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR PROVEEDOR
// =============================
export const crearProveedor = async (req, res) => {
  try {
    const { nombre, telefono, direccion, email } = req.body;

    // 🔥 Validación básica
    if (!nombre) {
      return errorResponse(res, "El nombre es obligatorio", 400);
    }

    const result = await pool.query(
      `INSERT INTO proveedor
       (nombre, telefono, direccion, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, telefono, direccion, email],
    );

    successResponse(res, result.rows[0], "Proveedor creado correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR PROVEEDORES
// =============================
export const listarProveedores = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM proveedor ORDER BY id_proveedor DESC",
    );

    successResponse(res, result.rows, "Proveedores obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER PROVEEDOR POR ID
// =============================
export const obtenerProveedor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM proveedor WHERE id_proveedor = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Proveedor no encontrado", 404);

    successResponse(res, result.rows[0], "Proveedor encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR PROVEEDOR
// =============================
export const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, direccion, email } = req.body;

    const result = await pool.query(
      `UPDATE proveedor
       SET nombre = $1,
           telefono = $2,
           direccion = $3,
           email = $4
       WHERE id_proveedor = $5
       RETURNING *`,
      [nombre, telefono, direccion, email, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Proveedor no encontrado", 404);

    successResponse(res, result.rows[0], "Proveedor actualizado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR PROVEEDOR
// =============================
export const eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM proveedor WHERE id_proveedor = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Proveedor no encontrado", 404);

    successResponse(res, null, "Proveedor eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
