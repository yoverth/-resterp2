sintaxis de bases de datos
-- =========================================
-- CREAR BASE DE DATOS (OPCIONAL)
-- =========================================
-- CREATE DATABASE resterp;
-- \c resterp;

-- =========================================
-- USUARIO
-- =========================================
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- EMPLEADO
-- =========================================
CREATE TABLE empleado (
    id_empleado SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(100),
    salario NUMERIC(10,2),
    estado BOOLEAN DEFAULT TRUE,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- =========================================
-- PAGO EMPLEADO
-- =========================================
CREATE TABLE pago_empleado (
    id_pago SERIAL PRIMARY KEY,
    id_empleado INT NOT NULL,
    fecha_pago DATE,
    monto NUMERIC(10,2),
    periodo VARCHAR(50),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado)
);

-- =========================================
-- CLIENTE
-- =========================================
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    tipo_cliente VARCHAR(50)
);

-- =========================================
-- CATEGORIA
-- =========================================
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- =========================================
-- PRODUCTO
-- =========================================
CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- =========================================
-- INVENTARIO
-- =========================================
CREATE TABLE inventario (
    id_inventario SERIAL PRIMARY KEY,
    id_producto INT UNIQUE,
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 5,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- =========================================
-- MESA
-- =========================================
CREATE TABLE mesa (
    id_mesa SERIAL PRIMARY KEY,
    numero INT UNIQUE NOT NULL,
    capacidad INT NOT NULL,
    estado VARCHAR(50) DEFAULT 'disponible'
);

-- =========================================
-- VENTA
-- =========================================
CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2),
    metodo_pago VARCHAR(50),
    tipo_venta VARCHAR(50),
    id_usuario INT,
    id_cliente INT,
    id_mesa INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_mesa) REFERENCES mesa(id_mesa)
);

-- =========================================
-- DETALLE VENTA
-- =========================================
CREATE TABLE detalle_venta (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT,
    precio_unitario NUMERIC(10,2),
    subtotal NUMERIC(10,2),
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- =========================================
-- PEDIDO (COCINA)
-- =========================================
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta)
);

-- =========================================
-- DOMICILIO
-- =========================================
CREATE TABLE domicilio (
    id_domicilio SERIAL PRIMARY KEY,
    id_venta INT,
    direccion TEXT,
    estado VARCHAR(50),
    valor NUMERIC(10,2),
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta)
);

-- =========================================
-- TIQUETERA
-- =========================================
CREATE TABLE tiquetera (
    id_tiquetera SERIAL PRIMARY KEY,
    id_cliente INT UNIQUE,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado_pago VARCHAR(50),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

-- =========================================
-- PROVEEDOR
-- =========================================
CREATE TABLE proveedor (
    id_proveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT,
    email VARCHAR(100)
);

-- =========================================
-- COMPRA
-- =========================================
CREATE TABLE compra (
    id_compra SERIAL PRIMARY KEY,
    id_proveedor INT,
    fecha DATE,
    total NUMERIC(10,2),
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor)
);

-- =========================================
-- DETALLE COMPRA
-- =========================================
CREATE TABLE detalle_compra (
    id_detalle_compra SERIAL PRIMARY KEY,
    id_compra INT,
    descripcion VARCHAR(150),
    cantidad INT,
    precio_unitario NUMERIC(10,2),
    subtotal NUMERIC(10,2),
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);