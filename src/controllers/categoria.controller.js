// src/controllers/categoria.controller.js

import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =============================
// CREAR CATEGORIA
// =============================
export const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const result = await pool.query(
      `INSERT INTO categoria 
       (nombre, descripcion)
       VALUES ($1, $2)
       RETURNING *`,
      [nombre, descripcion],
    );

    successResponse(res, result.rows[0], "Categoría creada correctamente", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// LISTAR CATEGORIAS
// =============================
export const listarCategorias = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categoria ORDER BY id_categoria",
    );

    successResponse(res, result.rows, "Categorías obtenidas");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// OBTENER CATEGORIA POR ID
// =============================
export const obtenerCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM categoria WHERE id_categoria = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return errorResponse(res, "Categoría no encontrada", 404);
    }

    successResponse(res, result.rows[0], "Categoría encontrada");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ACTUALIZAR CATEGORIA
// =============================
export const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const result = await pool.query(
      `UPDATE categoria
       SET nombre = $1,
           descripcion = $2
       WHERE id_categoria = $3
       RETURNING *`,
      [nombre, descripcion, id],
    );

    if (result.rows.length === 0) {
      return errorResponse(res, "Categoría no encontrada", 404);
    }

    successResponse(res, result.rows[0], "Categoría actualizada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// =============================
// ELIMINAR CATEGORIA
// =============================
export const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM categoria WHERE id_categoria = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return errorResponse(res, "Categoría no encontrada", 404);
    }

    successResponse(res, null, "Categoría eliminada correctamente");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
