import React, { useState } from "react";
import { Link } from "react-router-dom";

function ReporteSalud() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showDropdownGestion, setShowDropdownGestion] = useState(false);
  const [showDropdownReportes, setShowDropdownReportes] = useState(false);

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
    buttonContainer: {
      display: "flex",
      gap: "20px",
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
    loginButton: {
      backgroundColor: "#006400",
      color: "#FFFFFF",
      padding: "10px 20px",
      border: "none",
      borderRadius: "25px",
      fontSize: "1em",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      textDecoration: "none",
    },
    nav: {
      display: "flex",
      gap: "30px",
      fontSize: "1.2em",
      listStyleType: "none",
    },
    navItem: {
      position: "relative",
      cursor: "pointer",
      padding: "10px 20px",
      backgroundColor: "#003500",
      color: "#fff",
      borderRadius: "5px",
    },
    dropdown: {
      display: "block",
      position: "absolute",
      top: "100%",
      left: 0,
      backgroundColor: "#F5F5F0",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      listStyleType: "none",
      padding: "10px",
      width: "200px",
      zIndex: 1001,
    },
    dropdownHidden: {
      display: "none",
    },
    dropdownItem: {
      padding: "10px 15px",
      textDecoration: "none",
      color: "#333",
      display: "block",
      backgroundColor: "#fff",
      borderRadius: "5px",
      margin: "5px 0",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    },
    dropdownItemHover: {
      backgroundColor: "#005000",
      color: "#fff",
    },
  };

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const toggleDropdownGestion = () => {
    setShowDropdownGestion(!showDropdownGestion);
    setShowDropdownReportes(false);
  };

  const toggleDropdownReportes = () => {
    setShowDropdownReportes(!showDropdownReportes);
    setShowDropdownGestion(false);
  };

  return (
    <>
      <div style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Reporte Salud y Pensión</h1>
        </div>

        <nav>
          <ul style={styles.nav}>
            <li style={styles.navItem} onClick={toggleDropdownGestion}>
              Gráfico
              <ul
                style={
                  showDropdownGestion ? styles.dropdown : styles.dropdownHidden
                }
              >
                <li>
                  <Link
                    to="/dashboard2"
                    style={
                      hoveredLink === "dashboard2"
                        ? { ...styles.dropdownItem, ...styles.dropdownItemHover }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("dashboard2")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Dashboard 2
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard3"
                    style={
                      hoveredLink === "dashboard3"
                        ? { ...styles.dropdownItem, ...styles.dropdownItemHover }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("dashboard3")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Dashboard 3
                  </Link>
                </li>
              </ul>
            </li>

            <li style={styles.navItem} onClick={toggleDropdownReportes}>
              Reportes
              <ul
                style={
                  showDropdownReportes ? styles.dropdown : styles.dropdownHidden
                }
              >
                <li>
                  <Link
                    to="/formularioReportes3"
                    style={
                      hoveredLink === "formularioReportes3"
                        ? { ...styles.dropdownItem, ...styles.dropdownItemHover }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("formularioReportes3")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Formulario Reportes 3
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div style={styles.buttonContainer}>
          <Link to="/login" style={styles.loginButton}>
            LogIn
          </Link>
          <button style={styles.contactButton}>Contáctanos</button>
        </div>
      </div>

      <div style={{ marginTop: "100px", padding: "20px", textAlign: "center" }}>
        <h2>Bienvenido al Reporte de Salud y Pensión</h2>
        <p>Aquí va el contenido específico para el Reporte de Salud y Pensión...</p>
      </div>
    </>
  );
}

export default ReporteSalud;
