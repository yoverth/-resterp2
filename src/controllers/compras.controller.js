// src/controllers/compra.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR COMPRA
// =============================
export const crearCompra = async (req, res) => {
  try {
    const { id_proveedor, fecha, total } = req.body;

    const result = await pool.query(
      `INSERT INTO compra
       (id_proveedor, fecha, total)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id_proveedor, fecha, total],
    );

    successResponse(res, result.rows[0], "Compra creada correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR COMPRAS
// =============================
export const listarCompras = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        c.*,
        p.nombre AS proveedor_nombre
       FROM compra c
       LEFT JOIN proveedor p 
       ON c.id_proveedor = p.id_proveedor
       ORDER BY c.id_compra DESC`,
    );

    successResponse(res, result.rows, "Compras obtenidas");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER COMPRA POR ID
// =============================
export const obtenerCompra = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM compra WHERE id_compra = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Compra no encontrada", 404);

    successResponse(res, result.rows[0], "Compra encontrada");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR COMPRA
// =============================
export const actualizarCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_proveedor, fecha, total } = req.body;

    const result = await pool.query(
      `UPDATE compra
       SET id_proveedor = $1,
           fecha = $2,
           total = $3
       WHERE id_compra = $4
       RETURNING *`,
      [id_proveedor, fecha, total, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Compra no encontrada", 404);

    successResponse(res, result.rows[0], "Compra actualizada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR COMPRA
// =============================
export const eliminarCompra = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM compra WHERE id_compra = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Compra no encontrada", 404);

    successResponse(res, null, "Compra eliminada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
