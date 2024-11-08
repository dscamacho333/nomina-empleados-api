-- Insertar Permisos para Roles
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (1, 1, FALSE); -- ADMIN puede CREAR
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (1, 2, FALSE); -- ADMIN puede LEER
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (1, 3, FALSE); -- ADMIN puede ACTUALIZAR
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (1, 4, FALSE); -- ADMIN puede ELIMINAR
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (1, 5, FALSE); -- ADMIN puede LEER_TODO

INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (2, 2, FALSE); -- USUARIO puede LEER
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (2, 3, FALSE); -- USUARIO puede ACTUALIZAR

INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (3, 2, FALSE); -- INVITADO puede LEER

INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (4, 1, FALSE); -- DESARROLLADOR puede CREAR
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (4, 2, FALSE); -- DESARROLLADOR puede LEER
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (4, 3, FALSE); -- DESARROLLADOR puede ACTUALIZAR
INSERT INTO Permiso_Rol (rol_id, permiso_id, is_deleted) VALUES (4, 5, FALSE); -- DESARROLLADOR puede LEER_TODO
