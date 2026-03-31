import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";

const SECRET = "123456789";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return errorResponse(res, "Token requerido", 401);

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded; // 🔥 guardamos datos del usuario

    next(); // continuar
  } catch (error) {
    return errorResponse(res, "Token inválido", 401);
  }
};
