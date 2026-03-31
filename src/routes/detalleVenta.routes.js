import { Router } from "express";
import {
  crearDetalleVenta,
  listarDetalleVenta,
  obtenerDetalleVenta,
  actualizarDetalleVenta,
  eliminarDetalleVenta,
} from "../controllers/detalleVenta.controller.js";

const router = Router();

router.get("/", listarDetalleVenta);
router.get("/:id", obtenerDetalleVenta);
router.post("/", crearDetalleVenta);
router.put("/:id", actualizarDetalleVenta);
router.delete("/:id", eliminarDetalleVenta);

export default router;
