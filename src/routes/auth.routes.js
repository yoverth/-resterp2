import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  login,
  register,
  perfil,
  logout,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/perfil", verifyToken, perfil);

export default router;
