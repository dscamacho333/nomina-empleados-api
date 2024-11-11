import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF from "./ConsultasPDF";
import ConsultasPDF2 from "./ConsultasPDF2";

const FormularioReportes = () => {
  const [endpointSeleccionado, setEndpointSeleccionado] = useState("");
  const [formData, setFormData] = useState({
    ordenarPor: "primerNombre",
    ordenNombre: "asc",
  });
  const [reporteData, setReporteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEndpointChange = (e) => {
    setEndpointSeleccionado(e.target.value);
    setReporteData(null);
  };

  const obtenerDatos = async () => {
    if (!endpointSeleccionado) return;

    setIsLoading(true);
    setError(null);
    let url = "";

    if (endpointSeleccionado === "empleados-ordenados") {
      url = `http://localhost:8080/api/consultas/v1/empleados-ordenados?ordenarPor=${formData.ordenarPor}`;
    } else if (endpointSeleccionado === "empleados-por-cargo-dependencia") {
      url = `http://localhost:8080/api/consultas/v1/empleados-por-cargo-dependencia?ordenNombre=${formData.ordenNombre}`;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Token de autenticación no encontrado. Inicie sesión.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error en la autenticación o carga");

      const data = await response.json();
      setReporteData(data);
    } catch (error) {
      console.error("Error al cargar el reporte:", error);
      setError("Error al cargar el reporte. Verifique su autenticación.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (endpointSeleccionado) {
      obtenerDatos();
    }
  }, [endpointSeleccionado, formData]);

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Reportes de Nómina</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      <main style={styles.mainContent}>
        <h1>Generar Reporte de Nómina</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>
          Selecciona el tipo de reporte de nómina:
          <select onChange={handleEndpointChange} style={styles.input}>
            <option value="">Selecciona una opción</option>
            <option value="empleados-ordenados">
              Lista de empleados ordenados
            </option>
            <option value="empleados-por-cargo-dependencia">
              Cantidad y lista de empleados por cargo y dependencia
            </option>
          </select>
        </label>

        {endpointSeleccionado === "empleados-ordenados" && (
          <div>
            <label>
              Ordenar por:
              <select
                name="ordenarPor"
                value={formData.ordenarPor}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="primerNombre">Nombre</option>
                <option value="dependencia">Dependencia</option>
              </select>
            </label>
          </div>
        )}

        {endpointSeleccionado === "empleados-por-cargo-dependencia" && (
          <div>
            <label>
              Ordenar nombres:
              <select
                name="ordenNombre"
                value={formData.ordenNombre}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </label>
          </div>
        )}

        {isLoading ? (
          <p>Cargando reporte...</p>
        ) : (
          reporteData && (
            <>
              <PDFViewer
                style={{ width: "100%", height: "500px", marginTop: 20 }}
              >
                {endpointSeleccionado === "empleados-ordenados" ? (
                  <ConsultasPDF data={reporteData} />
                ) : (
                  <ConsultasPDF2 data={reporteData} />
                )}
              </PDFViewer>
              <PDFDownloadLink
                document={
                  endpointSeleccionado === "empleados-ordenados" ? (
                    <ConsultasPDF data={reporteData} />
                  ) : (
                    <ConsultasPDF2 data={reporteData} />
                  )
                }
                fileName="reporte_nomina.pdf"
                style={{ marginTop: 10 }}
              >
                {({ loading }) =>
                  loading ? "Generando PDF..." : "Descargar PDF"
                }
              </PDFDownloadLink>
            </>
          )
        )}
      </main>
    </div>
  );
};

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
  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "20px",
    marginTop: "100px",
  },
  input: {
    width: "100%",
    padding: "10px",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    margin: "10px 0",
  },
};

export default FormularioReportes;
