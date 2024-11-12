import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function AssignRole() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Token de autenticación no encontrado. Inicie sesión.");
      return;
    }

    const fetchUsuariosSinRol = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/usuario/v1/listar-sin-rol",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const usuariosData = await response.json();
          setUsuarios(usuariosData);
        } else {
          console.error("Error al cargar los usuarios sin rol");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    // Cargar roles desde el backend
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/rol/v1/listar",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const rolesData = await response.json();
          setRoles(rolesData);
        } else {
          console.error("Error al cargar los roles");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchUsuariosSinRol();
    fetchRoles();
  }, []);

  const handleAssignRole = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Token de autenticación no encontrado. Inicie sesión.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/rol-usuario/v1/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            usuarioDTO: { id: selectedUserId },
            rolDTO: {
              id: roles.find((role) => role.rolEnum === selectedRole).id,
            },
          }),
        }
      );

      if (response.ok) {
        alert("Rol asignado correctamente.");
        navigate("/home");
      } else {
        alert("Error al asignar el rol. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error de conexión. Inténtalo nuevamente.");
    }
  };

  return (
    <>
      <NavBar /> {}
      <div style={styles.container}>
        <h2 style={styles.title}>Asignar Rol a Usuario</h2>
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleAssignRole} style={styles.form}>
          <label style={styles.label}>Selecciona Usuario:</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.usuario}
              </option>
            ))}
          </select>

          <label style={styles.label}>Selecciona Rol:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Selecciona un rol</option>
            {roles
              .filter((role) => !role.deleted)
              .map((role) => (
                <option key={role.id} value={role.rolEnum}>
                  {role.rolEnum}
                </option>
              ))}
          </select>

          <button type="submit" style={styles.button}>
            Asignar Rol
          </button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    marginTop: "100px",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8em",
    color: "#003500",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontSize: "1.2em",
    color: "#003500",
  },
  select: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    width: "300px",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#5cb85c",
    color: "#FFFFFF",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AssignRole;
