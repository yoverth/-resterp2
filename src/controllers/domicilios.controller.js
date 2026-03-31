// src/controllers/domicilio.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR DOMICILIO
// =============================
export const crearDomicilio = async (req, res) => {
  try {
    const { id_venta, direccion, estado, valor } = req.body;

    const result = await pool.query(
      `INSERT INTO domicilio 
       (id_venta, direccion, estado, valor)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_venta, direccion, estado, valor],
    );

    successResponse(res, result.rows[0], "Domicilio creado correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR DOMICILIOS
// =============================
export const listarDomicilios = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        d.*,
        v.total,
        v.metodo_pago
       FROM domicilio d
       LEFT JOIN venta v 
       ON d.id_venta = v.id_venta
       ORDER BY d.id_domicilio DESC`,
    );

    successResponse(res, result.rows, "Domicilios obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER DOMICILIO POR ID
// =============================
export const obtenerDomicilio = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM domicilio WHERE id_domicilio = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Domicilio no encontrado", 404);

    successResponse(res, result.rows[0], "Domicilio encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR DOMICILIO
// =============================
export const actualizarDomicilio = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_venta, direccion, estado, valor } = req.body;

    const result = await pool.query(
      `UPDATE domicilio
       SET id_venta = $1,
           direccion = $2,
           estado = $3,
           valor = $4
       WHERE id_domicilio = $5
       RETURNING *`,
      [id_venta, direccion, estado, valor, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Domicilio no encontrado", 404);

    successResponse(res, result.rows[0], "Domicilio actualizado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR DOMICILIO
// =============================
export const eliminarDomicilio = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM domicilio WHERE id_domicilio = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Domicilio no encontrado", 404);

    successResponse(res, null, "Domicilio eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
