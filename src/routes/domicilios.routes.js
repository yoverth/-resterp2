import { Router } from "express";
import {
  crearDomicilio,
  listarDomicilios,
  obtenerDomicilio,
  actualizarDomicilio,
  eliminarDomicilio,
} from "../controllers/domicilios.controller.js";

const router = Router();

router.get("/", listarDomicilios);
router.get("/:id", obtenerDomicilio);
router.post("/", crearDomicilio);
router.put("/:id", actualizarDomicilio);
router.delete("/:id", eliminarDomicilio);

export default router;
