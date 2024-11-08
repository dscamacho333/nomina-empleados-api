-- Insertar Dependencias
INSERT INTO Dependencia (id_dependencia, nombre_dependencia, is_deleted) VALUES
(1, 'Tecnología', FALSE),
(2, 'Facturación', FALSE),
(3, 'Contabilidad', FALSE),
(4, 'Comercial', FALSE);

-- Insertar Cargos
INSERT INTO Cargo (id_cargo, nombre_cargo, is_deleted) VALUES
(1, 'Ingeniero de Desarrollo', FALSE),
(2, 'Auxiliar especializado', FALSE),
(3, 'Director de Impuestos', FALSE),
(4, 'Gerente de Ventas', FALSE),
(5, 'Director de Facturación', FALSE),
(6, 'Ingeniero de Soporte', FALSE),
(7, 'DBA', FALSE),
(8, 'Auditor interno', FALSE),
(9, 'Director de Presupuestos', FALSE),
(10, 'Líder de Infraestructura', FALSE),
(11, 'Director de Cartera', FALSE),
(12, 'Líder de QA', FALSE),
(13, 'Director de Costos', FALSE),
(14, 'Gerente TI', FALSE),
(15, 'Arquitecto de Software', FALSE),
(16, 'Asesor Comercial', FALSE),
(17, 'Analista QA', FALSE);

-- Insertar EPS
INSERT INTO EPS (id_eps, nombre_eps, is_deleted) VALUES
(1, 'EPS-Sanitas', FALSE),
(2, 'Aliansalud EPS', FALSE),
(3, 'Nueva EPS', FALSE),
(4, 'EPS-Sura', FALSE),
(5, 'Compensar EPS', FALSE),
(6, 'Salud Total EPS', FALSE);

-- Insertar ARL
INSERT INTO ARL (id_arl, nombre_arl, is_deleted) VALUES
(1, 'Positiva', FALSE),
(2, 'Sura', FALSE);

-- Insertar Pensiones
INSERT INTO Pension (id_pension, nombre_pension, is_deleted) VALUES
(1, 'Colpensiones', FALSE),
(2, 'Protección', FALSE),
(3, 'Provenir', FALSE),
(4, 'Skandia', FALSE);

SELECT * FROM dependencia;
SELECT * FROM cargo;
SELECT * FROM eps;
SELECT * FROM arl;
SELECT * FROM pension;
