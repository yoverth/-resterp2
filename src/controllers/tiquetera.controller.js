// src/controllers/tiquetera.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR TIQUETERA
// =============================
export const crearTiquetera = async (req, res) => {
  try {
    const { id_cliente, fecha_inicio, fecha_fin, estado_pago } = req.body;

    // 🔥 Validación básica
    if (!id_cliente || !fecha_inicio) {
      return errorResponse(res, "Cliente y fecha inicio son obligatorios", 400);
    }

    const result = await pool.query(
      `INSERT INTO tiquetera 
       (id_cliente, fecha_inicio, fecha_fin, estado_pago)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_cliente, fecha_inicio, fecha_fin, estado_pago],
    );

    successResponse(res, result.rows[0], "Tiquetera creada correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR TIQUETERAS
// =============================
export const listarTiqueteras = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        t.*,
        c.nombre AS cliente_nombre,
        c.telefono
       FROM tiquetera t
       JOIN cliente c 
       ON t.id_cliente = c.id_cliente
       ORDER BY t.id_tiquetera DESC`,
    );

    successResponse(res, result.rows, "Tiqueteras obtenidas");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER TIQUETERA POR ID
// =============================
export const obtenerTiquetera = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM tiquetera WHERE id_tiquetera = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Tiquetera no encontrada", 404);

    successResponse(res, result.rows[0], "Tiquetera encontrada");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR TIQUETERA
// =============================
export const actualizarTiquetera = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_cliente, fecha_inicio, fecha_fin, estado_pago } = req.body;

    const result = await pool.query(
      `UPDATE tiquetera
       SET id_cliente = $1,
           fecha_inicio = $2,
           fecha_fin = $3,
           estado_pago = $4
       WHERE id_tiquetera = $5
       RETURNING *`,
      [id_cliente, fecha_inicio, fecha_fin, estado_pago, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Tiquetera no encontrada", 404);

    successResponse(res, result.rows[0], "Tiquetera actualizada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR TIQUETERA
// =============================
export const eliminarTiquetera = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tiquetera WHERE id_tiquetera = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Tiquetera no encontrada", 404);

    successResponse(res, null, "Tiquetera eliminada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
