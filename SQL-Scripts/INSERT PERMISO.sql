-- Insertar Permisos
INSERT INTO Permiso (id_permiso, nombre_permiso, is_deleted) VALUES (1, 'CREAR', FALSE);
INSERT INTO Permiso (id_permiso, nombre_permiso, is_deleted) VALUES (2, 'LEER', FALSE);
INSERT INTO Permiso (id_permiso, nombre_permiso, is_deleted) VALUES (3, 'ACTUALIZAR', FALSE);
INSERT INTO Permiso (id_permiso, nombre_permiso, is_deleted) VALUES (4, 'ELIMINAR', FALSE);
INSERT INTO Permiso (id_permiso, nombre_permiso, is_deleted) VALUES (5, 'LEER_TODO', FALSE);

-- Insertar Roles
INSERT INTO Rol (role_name, is_deleted) VALUES ('ADMIN', FALSE);
INSERT INTO Rol (role_name, is_deleted) VALUES ('USUARIO', FALSE);
INSERT INTO Rol (role_name, is_deleted) VALUES ('INVITADO', FALSE);
INSERT INTO Rol (role_name, is_deleted) VALUES ('DESARROLLADOR', FALSE);
