// src/controllers/pedido.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR PEDIDO
// =============================
export const crearPedido = async (req, res) => {
  try {
    const { id_venta, estado } = req.body;

    const result = await pool.query(
      `INSERT INTO pedido (id_venta, estado)
       VALUES ($1, $2)
       RETURNING *`,
      [id_venta, estado],
    );

    successResponse(res, result.rows[0], "Pedido creado correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR PEDIDOS
// =============================
export const listarPedidos = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        p.*,
        v.total,
        v.metodo_pago
       FROM pedido p
       JOIN venta v ON p.id_venta = v.id_venta
       ORDER BY p.id_pedido DESC`,
    );

    successResponse(res, result.rows, "Pedidos obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER PEDIDO POR ID
// =============================
export const obtenerPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM pedido WHERE id_pedido = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Pedido no encontrado", 404);

    successResponse(res, result.rows[0], "Pedido encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR PEDIDO
// =============================
export const actualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_venta, estado } = req.body;

    const result = await pool.query(
      `UPDATE pedido
       SET id_venta = $1,
           estado = $2
       WHERE id_pedido = $3
       RETURNING *`,
      [id_venta, estado, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Pedido no encontrado", 404);

    successResponse(res, result.rows[0], "Pedido actualizado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR PEDIDO
// =============================
export const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM pedido WHERE id_pedido = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Pedido no encontrado", 404);

    successResponse(res, null, "Pedido eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
