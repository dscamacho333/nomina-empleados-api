-- Insertar Usuario
INSERT INTO Usuario (usuario, contrasenia, esta_habilitado, cuenta_no_expirada, cuenta_no_bloqueada, credenciales_no_expiradas, is_deleted) 
VALUES ('admin', '$2a$10$Qhy5vsG6AQ9V9J1RB3XJm.1tt7uwkl1dQtdA/fpAsidQ51dnE/6hq', true, true, true, true, FALSE);

-- Asignar Rol al Usuario
INSERT INTO Rol_Usuario (id_usuario, id_rol, is_deleted) VALUES (1, 1, FALSE);

SELECT * FROM usuario;
