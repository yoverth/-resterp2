import { Router } from "express";
import {
  crearInventario,
  listarInventario,
  obtenerInventario,
  actualizarInventario,
  eliminarInventario,
} from "../controllers/inventario.controller.js";

const router = Router();

router.get("/", listarInventario);
router.get("/:id", obtenerInventario);
router.post("/", crearInventario);
router.put("/:id", actualizarInventario);
router.delete("/:id", eliminarInventario);

export default router;
