import { Router } from "express";
import {
  crearTiquetera,
  listarTiqueteras,
  obtenerTiquetera,
  actualizarTiquetera,
  eliminarTiquetera,
} from "../controllers/tiquetera.controller.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", listarTiqueteras, isAdmin);
router.get("/:id", obtenerTiquetera);
router.post("/", crearTiquetera);
router.put("/:id", actualizarTiquetera);
router.delete("/:id", eliminarTiquetera);

export default router;
