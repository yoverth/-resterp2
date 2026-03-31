import { Router } from "express";
import {
  crearDetalleCompra,
  listarDetalleCompra,
  obtenerDetalleCompra,
  actualizarDetalleCompra,
  eliminarDetalleCompra,
} from "../controllers/detalleCompra.controller.js";

const router = Router();

router.get("/", listarDetalleCompra);
router.get("/:id", obtenerDetalleCompra);
router.post("/", crearDetalleCompra);
router.put("/:id", actualizarDetalleCompra);
router.delete("/:id", eliminarDetalleCompra);

export default router;
