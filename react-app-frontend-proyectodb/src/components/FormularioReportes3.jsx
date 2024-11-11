import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF4 from "./ConsultasPDF4";

const FormularioReportes3 = () => {
  const [ordenNombre, setOrdenNombre] = useState("asc");
  const [reporteData, setReporteData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para carga

  const handleInputChange = (e) => {
    setOrdenNombre(e.target.value);
  };

  const obtenerDatos = async () => {
    setIsLoading(true); // Mostrar estado de carga
    const url = `http://localhost:8080/api/consultas/v1/empleados-por-cargo-eps-pension?ordenNombre=${ordenNombre}`;
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("Token de autenticación no encontrado. Inicie sesión.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de datos");
      }

      const data = await response.json();
      setReporteData(data);
      setError(null);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setError("No se pudieron cargar los datos. Verifique su autenticación.");
    } finally {
      setIsLoading(false); // Ocultar estado de carga al finalizar
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, [ordenNombre]);

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Reporte de Salud y Pensión</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      <div style={styles.container}>
        <h2>Generar Reporte de Salud y Pensión</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <label style={styles.label}>
          Ordenar nombres:
          <select name="ordenNombre" value={ordenNombre} onChange={handleInputChange} style={styles.select}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </label>

        {isLoading ? ( // Mostrar mensaje de carga mientras se obtienen los datos
          <p>Cargando reporte...</p>
        ) : (
          reporteData && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <PDFViewer style={styles.pdfViewer}>
                <ConsultasPDF4 data={reporteData} />
              </PDFViewer>
              <PDFDownloadLink
                document={<ConsultasPDF4 data={reporteData} />}
                fileName="reporte_salud_pension.pdf"
                style={styles.downloadLink}
              >
                {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
              </PDFDownloadLink>
            </div>
          )
        )}
      </div>
    </>
  );
};

// Estilos de ARL y encabezado
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
  container: {
    padding: "20px",
    maxWidth: "1400px",
    margin: "auto",
    marginTop: "120px",
    textAlign: "center",
  },
  label: {
    display: "block",
    margin: "20px 0",
    fontSize: "1.1em",
    color: "#333",
  },
  select: {
    marginLeft: "10px",
    padding: "8px",
    fontSize: "1em",
  },
  pdfViewer: {
    width: "100%",
    height: "500px",
    marginTop: 20,
  },
  downloadLink: {
    marginTop: 10,
    textDecoration: "none",
  },
};

export default FormularioReportes3;
