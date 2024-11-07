import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      backgroundColor: '#F5F5F0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      borderBottom: '2px solid #ddd',
    },
    logo: {
      fontSize: '2.5em',
      fontWeight: 'bold',
      color: '#003500',
    },
    contactButton: {
      backgroundColor: '#003500',
      color: '#FFFFFF',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1em',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    },
    content: {
      marginTop: '100px', // Espacio para compensar el encabezado fijo
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Ocupar toda la altura de la pantalla
      backgroundColor: '#f5f5f5',
    },
    loginContainer: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      animation: 'fadeIn 1.5s ease-in-out', // Animación de aparición suave
    },
    input: {
      width: '100%',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#003500', // Cambia el color del borde cuando está enfocado
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#003500',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '18px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#005000',
      transform: 'translateY(-3px)', // Efecto de elevación al hacer hover
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hoveredButton, setHoveredButton] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null); // Para controlar el foco en los inputs

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <>
      <style>{styles.animationKeyframes}</style>
      {/* Encabezado */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </div>

      {/* Contenido principal */}
      <div style={styles.content}>
        <div style={styles.loginContainer}>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={focusedInput === 'email' ? { ...styles.input, ...styles.inputFocus } : styles.input}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={focusedInput === 'password' ? { ...styles.input, ...styles.inputFocus } : styles.input}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
            <button
              type="submit"
              style={hoveredButton ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              Iniciar Sesión
            </button>
          </form>
          <p style={{ marginTop: '20px' }}>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
