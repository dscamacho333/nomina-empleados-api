import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF4 from "./ConsultasPDF4";
import NavBarReporteSaludPension from "./NavBarReporteSaludPension"; // Importar NavBarReporteSaludPension

const FormularioReportes3 = () => {
  const [ordenNombre, setOrdenNombre] = useState("asc");
  const [reporteData, setReporteData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setOrdenNombre(e.target.value);
  };

  const obtenerDatos = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, [ordenNombre]);

  return (
    <>
      {/* Reemplazar encabezado con NavBarReporteSaludPension */}
      <NavBarReporteSaludPension />

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

        {isLoading ? (
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
