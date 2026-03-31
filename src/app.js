import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import pagoEmpleadoRoutes from "./routes/pagoEmpleado.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import categoriasRoutes from "./routes/categoria.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import inventarioRoutes from "./routes/inventario.routes.js";
import mesasRoutes from "./routes/mesa.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import detalleVentaRoutes from "./routes/detalleVenta.routes.js";
import pedidosRoutes from "./routes/pedido.routes.js";
import domiciliosRoutes from "./routes/domicilios.routes.js";
import tiqueterasRoutes from "./routes/tiquetera.routes.js";
import proveedoresRoutes from "./routes/proveedor.routes.js";
import comprasRoutes from "./routes/compras.routes.js";
import detalleCompraRoutes from "./routes/detalleCompra.routes.js";

import { verifyToken } from "./middlewares/auth.middleware.js";
import { isAdmin } from "./middlewares/role.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// ====================
// RUTAS
// ====================

// 🔓 PÚBLICAS
app.use("/api/auth", authRoutes);

// 🔐 PROTEGER TODO LO DEMÁS
app.use("/api", verifyToken);

// 🔐 PRIVADAS
app.use("/api/usuarios", isAdmin, usuariosRoutes);
app.use("/api/empleados", isAdmin, empleadosRoutes);
app.use("/api/pago-empleados", isAdmin, pagoEmpleadoRoutes);
app.use("/api/clientes", isAdmin, clientesRoutes);
app.use("/api/categorias", isAdmin, categoriasRoutes);
app.use("/api/productos", isAdmin, productosRoutes);
app.use("/api/inventario", isAdmin, inventarioRoutes);
app.use("/api/mesas", isAdmin, mesasRoutes);
app.use("/api/ventas", isAdmin, ventasRoutes);
app.use("/api/detalle-venta", isAdmin, detalleVentaRoutes);
app.use("/api/pedidos", isAdmin, pedidosRoutes);
app.use("/api/domicilios", isAdmin, domiciliosRoutes);
app.use("/api/tiqueteras", isAdmin, tiqueterasRoutes);
app.use("/api/proveedores", isAdmin, proveedoresRoutes);
app.use("/api/compras", isAdmin, comprasRoutes);
app.use("/api/detalle-compra", isAdmin, detalleCompraRoutes);

export default app;
