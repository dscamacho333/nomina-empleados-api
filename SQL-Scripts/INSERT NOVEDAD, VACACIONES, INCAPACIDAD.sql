-- Insertar Novedades
INSERT INTO Novedad (id_novedad, id_empleado, numero_dias, bonificacion, transporte, is_deleted) VALUES
(1, 2001, 30, 649809.00, 39764.00, FALSE),
(2, 2002, 30, 328354.00, 27195.00, FALSE),
(3, 2003, 30, 406552.00, 36305.00, FALSE),
(4, 2004, 12, 670106.00, 7475.00, FALSE),
(5, 2005, 30, 228523.00, 28702.00, FALSE),
(6, 2006, 30, 494233.00, 1582.00, FALSE),
(7, 2007, 30, 818017.00, 8004.00, FALSE),
(8, 2008, 20, 569760.00, 38517.00, FALSE),
(9, 2009, 30, 336775.00, 14345.00, FALSE),
(10, 2010, 30, 632261.00, 17441.00, FALSE),
(11, 2011, 30, 157647.00, 25643.00, FALSE),
(12, 2012, 30, 442282.00, 24306.00, FALSE),
(13, 2013, 15, 542140.00, 47866.00, FALSE),
(14, 2014, 30, 890426.00, 17476.00, FALSE),
(15, 2015, 30, 552774.00, 36141.00, FALSE),
(16, 2016, 30, 557368.00, 11870.00, FALSE),
(17, 2017, 25, 37847.00, 11568.00, FALSE),
(18, 2018, 30, 391789.00, 44018.00, FALSE),
(19, 2019, 30, 515406.00, 25063.00, FALSE),
(20, 2020, 30, 94347.00, 34270.00, FALSE),
(21, 2021, 30, 649809.00, 39764.00, FALSE),
(22, 2022, 30, 328354.00, 27195.00, FALSE),
(23, 2023, 30, 406552.00, 36305.00, FALSE),
(24, 2024, 25, 37847.00, 11568.00, FALSE),
(25, 2025, 15, 542140.00, 47866.00, FALSE),
(26, 2026, 30, 649809.00, 39764.00, FALSE),
(27, 2027, 30, 328354.00, 27195.00, FALSE);

-- Insertar Vacaciones
INSERT INTO Vacaciones (id_vacaciones, id_novedad, numero_dias, fecha_inicio, fecha_terminacion, is_deleted) VALUES
(1, 8, 10, '2022-03-10', '2022-03-21', FALSE),
(2, 13, 15, '2022-04-12', '2022-04-28', FALSE),
(3, 25, 15, '2022-01-12', '2022-01-28', FALSE);

-- Insertar Incapacidades
INSERT INTO Incapacidad (id_incapacidad, id_novedad, numero_dias, fecha_inicio, fecha_terminacion, is_deleted) VALUES
(1, 4, 18, '2022-03-02', '2022-03-19', FALSE),
(2, 17, 5, '2022-05-07', '2022-05-12', FALSE),
(3, 24, 4, '2022-08-07', '2022-08-11', FALSE);

SELECT * FROM novedad;
SELECT * FROM vacaciones;
SELECT * FROM incapacidad;