import { pool } from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

// CREAR
export const crearCliente = async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;

    const result = await pool.query(
      `INSERT INTO cliente (nombre, telefono, email)
       VALUES ($1,$2,$3) RETURNING *`,
      [nombre, telefono, email],
    );

    successResponse(res, result.rows[0], "Cliente creado", 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// LISTAR
export const listarClientes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cliente");

    successResponse(res, result.rows, "Clientes obtenidos");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// OBTENER
export const obtenerCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM cliente WHERE id_cliente = $1",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Cliente no encontrado", 404);

    successResponse(res, result.rows[0], "Cliente encontrado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// ACTUALIZAR
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;

    const result = await pool.query(
      `UPDATE cliente 
       SET nombre=$1, telefono=$2, email=$3
       WHERE id_cliente=$4
       RETURNING *`,
      [nombre, telefono, email, id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Cliente no encontrado", 404);

    successResponse(res, result.rows[0], "Cliente actualizado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// ELIMINAR
export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM cliente WHERE id_cliente=$1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0)
      return errorResponse(res, "Cliente no encontrado", 404);

    successResponse(res, null, "Cliente eliminado");
  } catch (error) {
    errorResponse(res, error.message);
  }
};
