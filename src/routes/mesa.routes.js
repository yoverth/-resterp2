import { Router } from "express";
import {
  crearMesa,
  listarMesas,
  obtenerMesa,
  actualizarMesa,
  eliminarMesa,
} from "../controllers/mesa.controller.js";

const router = Router();

router.get("/", listarMesas);
router.get("/:id", obtenerMesa);
router.post("/", crearMesa);
router.put("/:id", actualizarMesa);
router.delete("/:id", eliminarMesa);

export default router;
