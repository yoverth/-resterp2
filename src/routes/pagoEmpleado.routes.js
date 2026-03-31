import { Router } from "express";
import {
  crearPagoEmpleado,
  listarPagosEmpleado,
  obtenerPagoEmpleado,
  actualizarPagoEmpleado,
  eliminarPagoEmpleado,
} from "../controllers/pagoEmpleados.controller.js";

const router = Router();

router.get("/", listarPagosEmpleado);
router.get("/:id", obtenerPagoEmpleado);
router.post("/", crearPagoEmpleado);
router.put("/:id", actualizarPagoEmpleado);
router.delete("/:id", eliminarPagoEmpleado);

export default router;
