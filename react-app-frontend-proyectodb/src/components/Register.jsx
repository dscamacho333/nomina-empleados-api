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
      /* estilos similares a Login */
    },
    logo: {
      /* estilos similares a Login */
    },
    content: {
      /* estilos similares a Login */
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
      /* estilos de input similares a Login */
    },
    button: {
      /* estilos de button similares a Login */
    },
    buttonHover: {
      /* estilos de button hover similares a Login */
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/usuario/v1/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: username,
            contrasenia: password,
          }),
        }
      );

      if (response.ok) {
        alert("Usuario registrado con éxito.");
        navigate("/login"); // Redirigir a login después del registro
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
