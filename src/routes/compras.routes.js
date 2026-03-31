import { Router } from "express";
import {
  crearCompra,
  listarCompras,
  obtenerCompra,
  actualizarCompra,
  eliminarCompra,
} from "../controllers/compras.controller.js";

const router = Router();

// rutas limpias
router.get("/", listarCompras);
router.get("/:id", obtenerCompra);
router.post("/", crearCompra);
router.put("/:id", actualizarCompra);
router.delete("/:id", eliminarCompra);

export default router;
