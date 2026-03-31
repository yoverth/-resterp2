// src/controllers/mesa.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR MESA
// =============================
export const crearMesa = async (req, res) => {
  try {
    const { numero, capacidad, estado } = req.body;

    const result = await pool.query(
      `INSERT INTO mesa (numero, capacidad, estado)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [numero, capacidad, estado],
    );

    successResponse(res, result.rows[0], "Mesa creada correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR MESAS
// =============================
export const listarMesas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mesa ORDER BY numero");

    successResponse(res, result.rows, "Mesas obtenidas");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER MESA POR ID
// =============================
export const obtenerMesa = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM mesa WHERE id_mesa = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return errorResponse(res, "Mesa no encontrada", 404);

    successResponse(res, result.rows[0], "Mesa encontrada");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR MESA
// =============================
export const actualizarMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero, capacidad, estado } = req.body;

    const result = await pool.query(
      `UPDATE mesa
       SET numero = $1,
           capacidad = $2,
           estado = $3
       WHERE id_mesa = $4
       RETURNING *`,
      [numero, capacidad, estado, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Mesa no encontrada", 404);

    successResponse(res, result.rows[0], "Mesa actualizada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR MESA
// =============================
export const eliminarMesa = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM mesa WHERE id_mesa = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Mesa no encontrada", 404);

    successResponse(res, null, "Mesa eliminada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
