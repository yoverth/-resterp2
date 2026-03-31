// src/controllers/pagoEmpleado.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR PAGO EMPLEADO
// =============================
export const crearPagoEmpleado = async (req, res) => {
  try {
    const { id_empleado, fecha_pago, monto, periodo } = req.body;

    const result = await pool.query(
      `INSERT INTO pago_empleado 
       (id_empleado, fecha_pago, monto, periodo)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_empleado, fecha_pago, monto, periodo],
    );

    successResponse(res, result.rows[0], "Pago registrado correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR PAGOS
// =============================
export const listarPagosEmpleado = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, e.nombre AS empleado_nombre
       FROM pago_empleado p
       JOIN empleado e 
       ON p.id_empleado = e.id_empleado
       ORDER BY p.id_pago DESC`,
    );

    successResponse(res, result.rows, "Pagos obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER PAGO POR ID
// =============================
export const obtenerPagoEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM pago_empleado WHERE id_pago = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Pago no encontrado", 404);

    successResponse(res, result.rows[0], "Pago encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR PAGO
// =============================
export const actualizarPagoEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_empleado, fecha_pago, monto, periodo } = req.body;

    const result = await pool.query(
      `UPDATE pago_empleado
       SET id_empleado = $1,
           fecha_pago = $2,
           monto = $3,
           periodo = $4
       WHERE id_pago = $5
       RETURNING *`,
      [id_empleado, fecha_pago, monto, periodo, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Pago no encontrado", 404);

    successResponse(res, result.rows[0], "Pago actualizado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR PAGO
// =============================
export const eliminarPagoEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM pago_empleado WHERE id_pago = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Pago no encontrado", 404);

    successResponse(res, null, "Pago eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
