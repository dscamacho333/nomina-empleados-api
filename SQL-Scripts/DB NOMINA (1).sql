-- Base de datos
CREATE DATABASE nomina_empleados;

-- Tabla de Empleados
CREATE TABLE Empleado (
    id_empleado INT PRIMARY KEY,
    primer_apellido VARCHAR(50),
    segundo_apellido VARCHAR(50),
    primer_nombre VARCHAR(50),
    segundo_nombre VARCHAR(50),
    fecha_ingreso DATE,
    id_dependencia INT,
    id_cargo INT,
    id_eps INT,
    id_arl INT,
    id_pension INT,
    sueldo DOUBLE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_dependencia) REFERENCES Dependencia(id_dependencia),
    FOREIGN KEY (id_cargo) REFERENCES Cargo(id_cargo),
    FOREIGN KEY (id_eps) REFERENCES EPS(id_eps),
    FOREIGN KEY (id_arl) REFERENCES ARL(id_arl),
    FOREIGN KEY (id_pension) REFERENCES Pension(id_pension)
);

-- Tabla de Dependencias
CREATE TABLE Dependencia (
    id_dependencia INT PRIMARY KEY AUTO_INCREMENT,
    nombre_dependencia VARCHAR(50),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de Cargos
CREATE TABLE Cargo (
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_cargo VARCHAR(50),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de EPS
CREATE TABLE EPS (
    id_eps INT PRIMARY KEY AUTO_INCREMENT,
    nombre_eps VARCHAR(50),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de ARL
CREATE TABLE ARL (
    id_arl INT PRIMARY KEY AUTO_INCREMENT,
    nombre_arl VARCHAR(50),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de Pensiones
CREATE TABLE Pension (
    id_pension INT PRIMARY KEY AUTO_INCREMENT,
    nombre_pension VARCHAR(50),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de Novedades Generales
CREATE TABLE Novedad (
    id_novedad INT PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT,
    numero_dias INT,
    bonificacion DOUBLE,
    transporte DOUBLE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado)
);

-- Tabla de Vacaciones
CREATE TABLE Vacaciones (
    id_vacaciones INT PRIMARY KEY AUTO_INCREMENT,
    id_novedad INT,
    numero_dias INT,
    fecha_inicio DATE,
    fecha_terminacion DATE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_novedad) REFERENCES Novedad(id_novedad)
);

-- Tabla de Incapacidades
CREATE TABLE Incapacidad (
    id_incapacidad INT PRIMARY KEY AUTO_INCREMENT,
    id_novedad INT,
    numero_dias INT,
    fecha_inicio DATE,
    fecha_terminacion DATE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_novedad) REFERENCES Novedad(id_novedad)
);

-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    esta_habilitado BOOLEAN NOT NULL,
    cuenta_no_expirada BOOLEAN NOT NULL,
    cuenta_no_bloqueada BOOLEAN NOT NULL,
    credenciales_no_expiradas BOOLEAN NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla Rol
CREATE TABLE Rol (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    role_name ENUM('ADMIN', 'USUARIO', 'INVITADO', 'DESARROLLADOR') NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla Permiso
CREATE TABLE Permiso (
    id_permiso INT PRIMARY KEY AUTO_INCREMENT,
    nombre_permiso ENUM('CREAR', 'LEER', 'ACTUALIZAR', 'ELIMINAR', 'LEER_TODO') NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla Permiso_Rol (Relación muchos a muchos entre Permiso y Rol)
CREATE TABLE Permiso_Rol (
    id_permiso_rol INT PRIMARY KEY AUTO_INCREMENT,
    rol_id INT,
    permiso_id INT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (rol_id) REFERENCES Rol(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES Permiso(id_permiso) ON DELETE CASCADE
);

-- Tabla Rol_Usuario (Relación muchos a muchos entre Rol y Usuario)
CREATE TABLE Rol_Usuario (
    id_rol_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_rol INT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol) ON DELETE CASCADE
);
