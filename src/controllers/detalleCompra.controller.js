// src/controllers/detalleCompra.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR DETALLE COMPRA
// =============================
export const crearDetalleCompra = async (req, res) => {
  try {
    const { id_compra, descripcion, cantidad, precio_unitario } = req.body;

    const subtotal = cantidad * precio_unitario;

    const result = await pool.query(
      `INSERT INTO detalle_compra
       (id_compra, descripcion, cantidad, precio_unitario, subtotal)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id_compra, descripcion, cantidad, precio_unitario, subtotal],
    );

    successResponse(
      res,
      result.rows[0],
      "Detalle de compra creado correctamente",
      201,
    );
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR DETALLES COMPRA
// =============================
export const listarDetalleCompra = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        d.*,
        c.fecha
       FROM detalle_compra d
       LEFT JOIN compra c 
       ON d.id_compra = c.id_compra
       ORDER BY d.id_detalle_compra DESC`,
    );

    successResponse(res, result.rows, "Detalles de compra obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER DETALLE POR ID
// =============================
export const obtenerDetalleCompra = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM detalle_compra WHERE id_detalle_compra = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Detalle de compra no encontrado", 404);

    successResponse(res, result.rows[0], "Detalle encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR DETALLE COMPRA
// =============================
export const actualizarDetalleCompra = async (req, res) => {
  try {
    const { id } = req.params;

    const { id_compra, descripcion, cantidad, precio_unitario } = req.body;

    const subtotal = cantidad * precio_unitario;

    const result = await pool.query(
      `UPDATE detalle_compra
       SET id_compra = $1,
           descripcion = $2,
           cantidad = $3,
           precio_unitario = $4,
           subtotal = $5
       WHERE id_detalle_compra = $6
       RETURNING *`,
      [id_compra, descripcion, cantidad, precio_unitario, subtotal, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Detalle de compra no encontrado", 404);

    successResponse(
      res,
      result.rows[0],
      "Detalle de compra actualizado correctamente",
    );
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR DETALLE COMPRA
// =============================
export const eliminarDetalleCompra = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM detalle_compra WHERE id_detalle_compra = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Detalle de compra no encontrado", 404);

    successResponse(res, null, "Detalle de compra eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
