import { errorResponse } from "../utils/response.js";

export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return errorResponse(res, "No autorizado", 403);
  }

  next();
};

export const isCajero = (req, res, next) => {
  if (req.user.rol !== "cajero") {
    return errorResponse(res, "No autorizado", 403);
  }

  next();
};
