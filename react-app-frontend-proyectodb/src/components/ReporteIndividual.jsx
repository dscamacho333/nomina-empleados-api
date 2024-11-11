import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF3 from "./ConsultasPDF3";

const ReporteIndividual = () => {
  const [idEmpleado, setIdEmpleado] = useState("");
  const [empleadoIDs, setEmpleadoIDs] = useState([]);
  const [reporteData, setReporteData] = useState(null);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchEmpleadoIDs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/empleado/v1/listar-ids",
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener IDs de empleados");
        }
        const data = await response.json();
        setEmpleadoIDs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error:", error);
        setError("No se pudieron cargar los IDs de empleados");
      }
    };

    fetchEmpleadoIDs();
  }, []);

  const handleInputChange = (e) => {
    setIdEmpleado(e.target.value);
  };

  const obtenerDatos = async () => {
    if (!idEmpleado) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/consultas/v1/empleado-informacion?idEmpleado=${idEmpleado}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener la información del empleado");
      }
      const data = await response.json();
      setReporteData(data);
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo obtener la información del empleado");
    }
  };

  useEffect(() => {
    if (idEmpleado) {
      obtenerDatos();
    }
  }, [idEmpleado]);

  return (
    <>
      {/* Encabezado */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Reporte Individual</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      {/* Contenido principal */}
      <main style={styles.mainContent}>
        <section style={styles.hero}>
          <div style={styles.heroText}>
            <h2>Generar Reporte de Información Individual</h2>
          </div>
        </section>

        <section style={styles.container}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <label>
            Selecciona el empleado:
            <select
              name="idEmpleado"
              value={idEmpleado}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="">Selecciona un ID</option>
              {empleadoIDs.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </label>

          {/* Previsualización y descarga del PDF */}
          {reporteData && (
            <>
              <PDFViewer style={{ width: "100%", height: "500px", marginTop: 20 }}>
                <ConsultasPDF3 data={reporteData} />
              </PDFViewer>
              <PDFDownloadLink
                document={<ConsultasPDF3 data={reporteData} />}
                fileName="reporte_informacion_individual.pdf"
                style={{ marginTop: 10 }}
              >
                {({ loading }) =>
                  loading ? "Generando PDF..." : "Descargar PDF"
                }
              </PDFDownloadLink>
            </>
          )}
        </section>
      </main>
    </>
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
  hero: {
    textAlign: "center",
    marginBottom: "20px",
  },
  heroText: {
    fontSize: "2em",
    fontWeight: "bold",
    color: "#003500",
  },
  container: {
    maxWidth: "600px",
    width: "100%",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "10px",
    marginBottom: "20px",
  },
};

export default ReporteIndividual;
