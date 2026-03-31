import { Router } from "express";
import {
  crearEmpleado,
  listarEmpleados,
  obtenerEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
} from "../controllers/empleados.controller.js";

const router = Router();

router.get("/", listarEmpleados);
router.get("/:id", obtenerEmpleado);
router.post("/", crearEmpleado);
router.put("/:id", actualizarEmpleado);
router.delete("/:id", eliminarEmpleado);

export default router;
