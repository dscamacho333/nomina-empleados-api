import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [hoveredLink, setHoveredLink] = useState(null); // Estado para el enlace que está en hover
  const [showDropdownGestion, setShowDropdownGestion] = useState(false); // Estado para mostrar/ocultar el menú desplegable de "Gestión"
  const [showDropdownReportes, setShowDropdownReportes] = useState(false); // Estado para mostrar/ocultar el menú desplegable de "Reportes"

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
      gap: "20px", // Espacio entre botones
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
      backgroundColor: "#006400", // Un color diferente para el botón de LogIn
      color: "#FFFFFF",
      padding: "10px 20px",
      border: "none",
      borderRadius: "25px",
      fontSize: "1em",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      textDecoration: "none", // Quitar subrayado del link
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
    setShowDropdownReportes(false); // Aseguramos que solo uno esté abierto a la vez
  };

  const toggleDropdownReportes = () => {
    setShowDropdownReportes(!showDropdownReportes);
    setShowDropdownGestion(false); // Aseguramos que solo uno esté abierto a la vez
  };

  return (
    <>
      {/* Encabezado con menús desplegables */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol</h1>
        </div>

        <nav>
          <ul style={styles.nav}>
            {/* Gestión con menú desplegable */}
            <li style={styles.navItem} onClick={toggleDropdownGestion}>
              Gestión
              <ul
                style={
                  showDropdownGestion ? styles.dropdown : styles.dropdownHidden
                }
              >
                <li>
                  <Link
                    to="/dependencias"
                    style={
                      hoveredLink === "dependencias"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("dependencias")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Dependencias
                  </Link>
                </li>
                <li>
                  <Link
                    to="/arl"
                    style={
                      hoveredLink === "arl"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("arl")}
                    onMouseLeave={handleMouseLeave}
                  >
                    ARL
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cargos"
                    style={
                      hoveredLink === "cargos"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("cargos")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Cargos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/eps"
                    style={
                      hoveredLink === "eps"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("eps")}
                    onMouseLeave={handleMouseLeave}
                  >
                    EPS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/empleado"
                    style={
                      hoveredLink === "empleado"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("empleado")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Empleado
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pension"
                    style={
                      hoveredLink === "pension"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("pension")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Pensión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/novedad"
                    style={
                      hoveredLink === "novedad"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("novedad")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Novedad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/incapacidad"
                    style={
                      hoveredLink === "incapacidad"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("incapacidad")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Incapacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vacaciones"
                    style={
                      hoveredLink === "vacaciones"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("vacaciones")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Vacaciones
                  </Link>
                </li>
              </ul>
            </li>

            {/* Reportes con menú desplegable */}
            <li style={styles.navItem} onClick={toggleDropdownReportes}>
              Reportes
              <ul
                style={
                  showDropdownReportes ? styles.dropdown : styles.dropdownHidden
                }
              >
                <li>
                  <Link
                    to="/reporte1"
                    style={
                      hoveredLink === "reporte1"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("reporte1")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Reporte 1
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reporte2"
                    style={
                      hoveredLink === "reporte2"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("reporte2")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Reporte 2
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reporte3"
                    style={
                      hoveredLink === "reporte3"
                        ? {
                            ...styles.dropdownItem,
                            ...styles.dropdownItemHover,
                          }
                        : styles.dropdownItem
                    }
                    onMouseEnter={() => handleMouseEnter("reporte3")}
                    onMouseLeave={handleMouseLeave}
                  >
                    Reporte 3
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Botones de Contáctanos y LogIn */}
        <div style={styles.buttonContainer}>
          <Link to="/login" style={styles.loginButton}>
            LogIn
          </Link>
          <button style={styles.contactButton}>Contáctanos</button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ marginTop: "100px", padding: "20px", textAlign: "center" }}>
        <h2>Bienvenido a la página principal</h2>
        <p>Aquí va el contenido de la página...</p>
      </div>
    </>
  );
}

export default Home;
