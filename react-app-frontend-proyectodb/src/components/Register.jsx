import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hoveredButton, setHoveredButton] = useState(false);
  const navigate = useNavigate();

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "#F5F5F0",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      borderBottom: "2px solid #ddd",
    },
    logo: {
      fontSize: "2.5em",
      fontWeight: "bold",
      color: "#003500",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "20px",
      marginTop: "100px",
    },
    registerContainer: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      animation: "fadeIn 1.5s ease-in-out",
    },
    input: {
      width: "100%",
      padding: "10px",
      maxWidth: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      margin: "10px 0",
    },
    button: {
      backgroundColor: "#5cb85c",
      color: "#fff",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      maxWidth: "300px",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#4cae4c",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Error de autenticación. Por favor inicia sesión.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuario/v1/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario: username,
          contrasenia: password,
        }),
      });

      if (response.ok) {
        alert("Usuario registrado con éxito.");
        navigate("/login"); // Redirige a login después del registro
      } else if (response.status === 403) {
        alert("No tienes permisos para crear un nuevo usuario.");
      } else {
        alert("Error al registrar usuario. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error de conexión. Inténtalo nuevamente.");
    }
  };

  return (
    <div style={styles.content}>
      <header style={styles.header}>
        <div style={styles.logo}>UroCol - Registro</div>
      </header>
      <div style={styles.registerContainer}>
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            style={
              hoveredButton
                ? { ...styles.button, ...styles.buttonHover }
                : styles.button
            }
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
