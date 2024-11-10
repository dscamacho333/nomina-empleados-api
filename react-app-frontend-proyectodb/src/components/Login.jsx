import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import UseRecaptchaComponent from "./UseRecaptchaComponent";

function Login() {
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hoveredButton, setHoveredButton] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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
    contactButton: {
      backgroundColor: "#003500",
      color: "#FFFFFF",
      padding: "10px 20px",
      border: "none",
      borderRadius: "25px",
      fontSize: "1em",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    },
    content: {
      marginTop: "100px",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    },
    loginContainer: {
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
      padding: "15px",
      margin: "10px 0",
      borderRadius: "5px",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: focusedInput ? "#003500" : "#ccc",
      fontSize: "16px",
      transition: "border-color 0.3s ease",
    },
    button: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#003500",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "18px",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s ease, transform 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#005000",
      transform: "translateY(-3px)",
    },
    animationKeyframes: `
      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  };

  const handleRecaptcha = useCallback((token) => {
    console.log("reCAPTCHA token received:", token);
    setCaptchaToken(token || "");
  }, []);

  const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Por favor, completa el reCAPTCHA.");
      return;
    }

    console.log("Datos antes de enviar:", {
      username,
      password,
      captchaToken,
    });

    try {
      const response = await fetchWithTimeout(
        "http://localhost:8080/api/auth/v1/log-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: username,
            contrasenia: password,
            token: captchaToken,
          }),
        },
        5000
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (data.status) {
          alert("¡Inicio de sesión exitoso!");
          console.log("Token JWT:", data.jwtToken);
          localStorage.setItem("jwtToken", data.jwtToken);
        } else {
          alert("Credenciales incorrectas. Intenta de nuevo.");
        }
      } else {
        const errorData = await response.json();

        if (
          response.status === 404 &&
          errorData.message.includes("no existe")
        ) {
          alert("El usuario no existe. Verifica los datos ingresados.");
        } else if (
          response.status === 404 &&
          errorData.message.includes("contraseña")
        ) {
          alert("Contraseña incorrecta. Intenta nuevamente.");
        } else {
          console.error("Error desconocido:", errorData.message);
          alert("Error de autenticación. Inténtalo nuevamente.");
        }
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor. Inténtalo nuevamente.");
    }
  };

  return (
    <>
      <style>{styles.animationKeyframes}</style>
      <div style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </div>
      <div style={styles.content}>
        <div style={styles.loginContainer}>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                ...styles.input,
                borderColor: focusedInput === "username" ? "#003500" : "#ccc",
              }}
              onFocus={() => setFocusedInput("username")}
              onBlur={() => setFocusedInput(null)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                borderColor: focusedInput === "password" ? "#003500" : "#ccc",
              }}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <UseRecaptchaComponent handleRecaptcha={handleRecaptcha} />
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
              Iniciar Sesión
            </button>
          </form>
          <p style={{ marginTop: "20px" }}>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
