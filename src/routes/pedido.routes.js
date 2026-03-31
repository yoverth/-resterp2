import { Router } from "express";
import {
  crearPedido,
  listarPedidos,
  obtenerPedido,
  actualizarPedido,
  eliminarPedido,
} from "../controllers/pedido.controller.js";

const router = Router();

router.get("/", listarPedidos);
router.get("/:id", obtenerPedido);
router.post("/", crearPedido);
router.put("/:id", actualizarPedido);
router.delete("/:id", eliminarPedido);

export default router;
