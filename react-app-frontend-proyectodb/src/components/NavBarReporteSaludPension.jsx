import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBarReporteSaludPension() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showDropdownGestion, setShowDropdownGestion] = useState(false);
  const [showDropdownReportes, setShowDropdownReportes] = useState(false);
  const [showDropdownGraficos, setShowDropdownGraficos] = useState(false);
  const [showDropdownReportesFormulario, setShowDropdownReportesFormulario] = useState(false);

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
    setShowDropdownGraficos(false);
    setShowDropdownReportesFormulario(false);
  };

  const toggleDropdownReportes = () => {
    setShowDropdownReportes(!showDropdownReportes);
    setShowDropdownGestion(false);
    setShowDropdownGraficos(false);
    setShowDropdownReportesFormulario(false);
  };

  const toggleDropdownGraficos = () => {
    setShowDropdownGraficos(!showDropdownGraficos);
    setShowDropdownGestion(false);
    setShowDropdownReportes(false);
    setShowDropdownReportesFormulario(false);
  };

  const toggleDropdownReportesFormulario = () => {
    setShowDropdownReportesFormulario(!showDropdownReportesFormulario);
    setShowDropdownGestion(false);
    setShowDropdownReportes(false);
    setShowDropdownGraficos(false);
  };

  return (
    <>
      <div style={styles.header}>
      <Link to="/home" style={styles.logo}>
        <h1>UruCol-242</h1>
      </Link>

        <nav>
          <ul style={styles.nav}>
            {/* Gestión Dropdown Menu */}
            <li style={styles.navItem} onClick={toggleDropdownGestion}>
              Gestión
              <ul style={showDropdownGestion ? styles.dropdown : styles.dropdownHidden}>
                <li>
                  <Link to="/dependencias" style={hoveredLink === "dependencias" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("dependencias")}
                    onMouseLeave={handleMouseLeave}>
                    Dependencias
                  </Link>
                </li>
                <li>
                  <Link to="/arl" style={hoveredLink === "arl" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("arl")}
                    onMouseLeave={handleMouseLeave}>
                    ARL
                  </Link>
                </li>
                <li>
                  <Link to="/cargos" style={hoveredLink === "cargos" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("cargos")}
                    onMouseLeave={handleMouseLeave}>
                    Cargos
                  </Link>
                </li>
                <li>
                  <Link to="/eps" style={hoveredLink === "eps" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("eps")}
                    onMouseLeave={handleMouseLeave}>
                    EPS
                  </Link>
                </li>
                <li>
                  <Link to="/empleado" style={hoveredLink === "empleado" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("empleado")}
                    onMouseLeave={handleMouseLeave}>
                    Empleado
                  </Link>
                </li>
                <li>
                <Link to="/pension" style={hoveredLink === "pension" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                  onMouseEnter={() => handleMouseEnter("pension")}
                  onMouseLeave={handleMouseLeave}>
                  Pensión
                </Link>
              </li>
              <li>
                <Link to="/novedad" style={hoveredLink === "novedad" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                  onMouseEnter={() => handleMouseEnter("novedad")}
                  onMouseLeave={handleMouseLeave}>
                  Novedad
                </Link>
              </li>
              <li>
                <Link to="/incapacidad" style={hoveredLink === "incapacidad" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                  onMouseEnter={() => handleMouseEnter("incapacidad")}
                  onMouseLeave={handleMouseLeave}>
                  Incapacidad
                </Link>
              </li>
              <li>
                <Link to="/vacaciones" style={hoveredLink === "vacaciones" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                  onMouseEnter={() => handleMouseEnter("vacaciones")}
                  onMouseLeave={handleMouseLeave}>
                  Vacaciones
                </Link>
              </li>
            </ul>
          </li>

            {/* Reportes Dropdown Menu */}
            <li style={styles.navItem} onClick={toggleDropdownReportes}>
              Reportes
              <ul style={showDropdownReportes ? styles.dropdown : styles.dropdownHidden}>
                <li>
                  <Link to="/reporteNomina" style={hoveredLink === "reporteNomina" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("reporteNomina")}
                    onMouseLeave={handleMouseLeave}>
                    Reporte Nómina
                  </Link>
                </li>
                <li>
                  <Link to="/reporteIndividual" style={hoveredLink === "reporteIndividual" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("reporteIndividual")}
                    onMouseLeave={handleMouseLeave}>
                    Reporte Individual
                  </Link>
                </li>
                <li>
                  <Link to="/reporteSaludPension" style={hoveredLink === "reporteSaludPension" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("reporteSaludPension")}
                    onMouseLeave={handleMouseLeave}>
                    Reporte Salud y Pensión
                  </Link>
                </li>
                <li>
                  <Link to="/reporteNovedad" style={hoveredLink === "reporteNovedad" ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                    onMouseEnter={() => handleMouseEnter("reporteNovedad")}
                    onMouseLeave={handleMouseLeave}>
                    Novedad
                  </Link>
                </li>
              </ul>
            </li>

            {/* Gráficos Dropdown Menu */}
            <li style={styles.navItem} onClick={toggleDropdownGraficos}>
              Gráficos
              <ul
                style={
                  showDropdownGraficos ? styles.dropdown : styles.dropdownHidden
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
                    EPS y Pensión
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
                    Empleados por EPS
                  </Link>
                </li>
              </ul>
            </li>

            <li style={styles.navItem} onClick={toggleDropdownReportesFormulario}>
              Consultas
              <ul
                style={
                  showDropdownReportesFormulario ? styles.dropdown : styles.dropdownHidden
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
                    Reporte de Salud y Pensión
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div style={styles.buttonContainer}>
          <Link to="/login" style={styles.loginButton}>LogOut</Link>
          <button style={styles.contactButton}>Contáctanos</button>
        </div>
      </div>

    </>
  );
}

export default NavBarReporteSaludPension;
