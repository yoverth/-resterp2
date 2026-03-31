// src/controllers/inventario.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR INVENTARIO
// =============================
export const crearInventario = async (req, res) => {
  try {
    const { id_producto, stock, stock_minimo } = req.body;

    const result = await pool.query(
      `INSERT INTO inventario 
       (id_producto, stock, stock_minimo)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id_producto, stock, stock_minimo],
    );

    successResponse(
      res,
      result.rows[0],
      "Inventario creado correctamente",
      201,
    );
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR INVENTARIO
// =============================
export const listarInventario = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, p.nombre AS producto_nombre
       FROM inventario i
       JOIN producto p 
       ON i.id_producto = p.id_producto
       ORDER BY i.id_inventario DESC`,
    );

    successResponse(res, result.rows, "Inventario obtenido");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER INVENTARIO POR ID
// =============================
export const obtenerInventario = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM inventario WHERE id_inventario = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Inventario no encontrado", 404);

    successResponse(res, result.rows[0], "Inventario encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR INVENTARIO
// =============================
export const actualizarInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_producto, stock, stock_minimo } = req.body;

    const result = await pool.query(
      `UPDATE inventario
       SET id_producto = $1,
           stock = $2,
           stock_minimo = $3,
           ultima_actualizacion = CURRENT_TIMESTAMP
       WHERE id_inventario = $4
       RETURNING *`,
      [id_producto, stock, stock_minimo, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Inventario no encontrado", 404);

    successResponse(
      res,
      result.rows[0],
      "Inventario actualizado correctamente",
    );
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR INVENTARIO
// =============================
export const eliminarInventario = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM inventario WHERE id_inventario = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Inventario no encontrado", 404);

    successResponse(res, null, "Inventario eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
