import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, id_categoria } = req.body;

    const result = await pool.query(
      `INSERT INTO producto (nombre, precio, id_categoria)
       VALUES ($1,$2,$3) RETURNING *`,
      [nombre, precio, id_categoria],
    );

    successResponse(res, result.rows[0], "Producto creado", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const listarProductos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM producto");

    successResponse(res, result.rows, "Productos obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM producto WHERE id_producto=$1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Producto no encontrado", 404);

    successResponse(res, result.rows[0], "Producto encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, id_categoria } = req.body;

    const result = await pool.query(
      `UPDATE producto 
       SET nombre=$1, precio=$2, id_categoria=$3
       WHERE id_producto=$4
       RETURNING *`,
      [nombre, precio, id_categoria, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Producto no encontrado", 404);

    successResponse(res, result.rows[0], "Producto actualizado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM producto WHERE id_producto=$1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Producto no encontrado", 404);

    successResponse(res, null, "Producto eliminado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
