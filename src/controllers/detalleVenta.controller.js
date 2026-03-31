// src/controllers/detalleVenta.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR DETALLE VENTA
// =============================
export const crearDetalleVenta = async (req, res) => {
  try {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;

    const subtotal = cantidad * precio_unitario;

    const result = await pool.query(
      `INSERT INTO detalle_venta
       (id_venta, id_producto, cantidad, precio_unitario, subtotal)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id_venta, id_producto, cantidad, precio_unitario, subtotal],
    );

    successResponse(
      res,
      result.rows[0],
      "Detalle de venta creado correctamente",
      201,
    );
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR DETALLES
// =============================
export const listarDetalleVenta = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        d.*,
        p.nombre AS producto_nombre
       FROM detalle_venta d
       JOIN producto p 
       ON d.id_producto = p.id_producto
       ORDER BY d.id_detalle DESC`,
    );

    successResponse(res, result.rows, "Detalles de venta obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER DETALLE POR ID
// =============================
export const obtenerDetalleVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM detalle_venta WHERE id_detalle = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Detalle no encontrado", 404);

    successResponse(res, result.rows[0], "Detalle encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR DETALLE
// =============================
export const actualizarDetalleVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;

    const subtotal = cantidad * precio_unitario;

    const result = await pool.query(
      `UPDATE detalle_venta
       SET id_venta = $1,
           id_producto = $2,
           cantidad = $3,
           precio_unitario = $4,
           subtotal = $5
       WHERE id_detalle = $6
       RETURNING *`,
      [id_venta, id_producto, cantidad, precio_unitario, subtotal, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Detalle no encontrado", 404);

    successResponse(res, result.rows[0], "Detalle actualizado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR DETALLE
// =============================
export const eliminarDetalleVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM detalle_venta WHERE id_detalle = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Detalle no encontrado", 404);

    successResponse(res, null, "Detalle eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
