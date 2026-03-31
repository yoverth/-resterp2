// src/controllers/venta.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR VENTA
// =============================
export const crearVenta = async (req, res) => {
  try {
    const { total, metodo_pago, tipo_venta, id_usuario, id_cliente, id_mesa } =
      req.body;

    const result = await pool.query(
      `INSERT INTO venta 
      (total, metodo_pago, tipo_venta, id_usuario, id_cliente, id_mesa)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [total, metodo_pago, tipo_venta, id_usuario, id_cliente, id_mesa],
    );

    successResponse(res, result.rows[0], "Venta creada correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR VENTAS
// =============================
export const listarVentas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        v.*,
        u.nombre AS usuario_nombre,
        c.nombre AS cliente_nombre,
        m.numero AS mesa_numero
       FROM venta v
       LEFT JOIN usuario u ON v.id_usuario = u.id_usuario
       LEFT JOIN cliente c ON v.id_cliente = c.id_cliente
       LEFT JOIN mesa m ON v.id_mesa = m.id_mesa
       ORDER BY v.id_venta DESC
    `);

    successResponse(res, result.rows, "Ventas obtenidas");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER VENTA
// =============================
export const obtenerVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM venta WHERE id_venta = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return errorResponse(res, "Venta no encontrada", 404);

    successResponse(res, result.rows[0], "Venta encontrada");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR VENTA
// =============================
export const actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const { total, metodo_pago, tipo_venta, id_usuario, id_cliente, id_mesa } =
      req.body;

    const result = await pool.query(
      `UPDATE venta
       SET total = $1,
           metodo_pago = $2,
           tipo_venta = $3,
           id_usuario = $4,
           id_cliente = $5,
           id_mesa = $6
       WHERE id_venta = $7
       RETURNING *`,
      [total, metodo_pago, tipo_venta, id_usuario, id_cliente, id_mesa, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Venta no encontrada", 404);

    successResponse(res, result.rows[0], "Venta actualizada");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR VENTA
// =============================
export const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM venta WHERE id_venta = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Venta no encontrada", 404);

    successResponse(res, null, "Venta eliminada");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
