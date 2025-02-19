-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS sistema_nomina;
USE sistema_nomina;

-- Tabla de Departamentos
CREATE TABLE departamentos (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla de Empleados
CREATE TABLE empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150),
    telefono VARCHAR(15),
    direccion TEXT,
    fecha_contratacion DATE NOT NULL,
    id_departamento INT,
    salario DECIMAL(10, 2) NOT NULL,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    rol VARCHAR(50) DEFAULT 'Empleado',
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
);

-- Tabla de Pagos
CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_empleado INT,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATE NOT NULL,
    estado ENUM('Pagado', 'Pendiente') DEFAULT 'Pendiente',
    metodo_pago VARCHAR(50),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla de Asistencias
CREATE TABLE asistencias (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_empleado INT,
    fecha DATE NOT NULL,
    hora_entrada TIME,
    hora_salida TIME,
    estado ENUM('Presente', 'Ausente') DEFAULT 'Presente',
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla de Cesta Tickets
CREATE TABLE cesta_tickets (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    id_empleado INT,
    monto DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla de Usuarios para el sistema
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('Administrador', 'Empleado') DEFAULT 'Empleado',
    id_empleado INT,
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla de Bitácora de Usuarios
CREATE TABLE bitacora_usuarios (
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    accion TEXT NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Datos de ejemplo (Opcional)
INSERT INTO departamentos (nombre, descripcion) VALUES
('Recursos Humanos', 'Gestión del personal y nómina'),
('Finanzas', 'Control financiero y pagos');

INSERT INTO empleados (nombre, apellido, correo, telefono, direccion, fecha_contratacion, id_departamento, salario, estado, rol) VALUES
('Juan', 'Pérez', 'juan@example.com', '123456789', 'Calle Falsa 123', '2022-01-01', 1, 1200.00, 'Activo', 'Empleado');  