// src/controllers/empleado.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR EMPLEADO
// =============================
export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, salario, estado, id_usuario } = req.body;

    const result = await pool.query(
      `INSERT INTO empleado 
      (nombre, cargo, salario, estado, id_usuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nombre, cargo, salario, estado, id_usuario],
    );

    successResponse(res, result.rows[0], "Empleado creado correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR EMPLEADOS
// =============================
export const listarEmpleados = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.*, u.nombre as usuario_nombre
       FROM empleado e
       LEFT JOIN usuario u 
       ON e.id_usuario = u.id_usuario
       ORDER BY e.id_empleado DESC`,
    );

    successResponse(res, result.rows, "Empleados obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER EMPLEADO POR ID
// =============================
export const obtenerEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM empleado 
       WHERE id_empleado = $1`,
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Empleado no encontrado", 404);

    successResponse(res, result.rows[0], "Empleado encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR EMPLEADO
// =============================
export const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cargo, salario, estado, id_usuario } = req.body;

    const result = await pool.query(
      `UPDATE empleado
       SET nombre = $1,
           cargo = $2,
           salario = $3,
           estado = $4,
           id_usuario = $5
       WHERE id_empleado = $6
       RETURNING *`,
      [nombre, cargo, salario, estado, id_usuario, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Empleado no encontrado", 404);

    successResponse(res, result.rows[0], "Empleado actualizado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR EMPLEADO
// =============================
export const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM empleado WHERE id_empleado = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Empleado no encontrado", 404);

    successResponse(res, null, "Empleado eliminado correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
