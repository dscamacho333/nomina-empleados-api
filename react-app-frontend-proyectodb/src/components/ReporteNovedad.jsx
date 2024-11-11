// ReporteNovedad.jsx
import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF5 from "./ConsultasPDF5";
import ConsultasPDF6 from "./ConsultasPDF6";
import NavBar from './NavBar'; // Importa NavBar

const ReporteNovedad = () => {
  const [endpointSeleccionado, setEndpointSeleccionado] = useState("");
  const [formData, setFormData] = useState({
    fechaInicio: "",
    fechaFin: "",
    dependencia: "",
    cargo: "",
  });
  const [reporteData, setReporteData] = useState(null);
  const [cargos, setCargos] = useState([]);
  const [error, setError] = useState(null);

  const dependencias = ["Comercial", "Contabilidad", "Facturacion", "Tecnologia"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const obtenerCargos = async (nombreDependencia) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Token de autenticación no encontrado. Inicie sesión.");
        return;
      }
      const response = await fetch(`http://localhost:8080/api/consultas/v1/${nombreDependencia}/cargos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCargos(data);
      } else {
        console.error("Error al obtener cargos");
      }
    } catch (error) {
      console.error("Error en la solicitud de cargos:", error);
    }
  };

  useEffect(() => {
    if (formData.dependencia) {
      obtenerCargos(formData.dependencia);
    }
  }, [formData.dependencia]);

  const obtenerDatos = async () => {
    if (!endpointSeleccionado) return;

    const convertirFecha = (fecha) => {
      const [year, month] = fecha.split("-");
      return `${month}/${year}`;
    };

    const fechaInicio = convertirFecha(formData.fechaInicio);
    const fechaFin = convertirFecha(formData.fechaFin);

    let url = `http://localhost:8080/api/consultas/v1/${endpointSeleccionado}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;

    if (formData.dependencia) {
      url += `&dependencia=${formData.dependencia}`;
    }
    if (formData.cargo) {
      url += `&cargo=${formData.cargo}`;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Token de autenticación no encontrado. Inicie sesión.");
      return;
    }

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setReporteData(data);
        setError(null);
      } else {
        console.error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error en la solicitud de datos:", error);
      setError("Error en la solicitud de datos. Verifique su autenticación.");
    }
  };

  useEffect(() => {
    if (endpointSeleccionado) {
      obtenerDatos();
    }
  }, [endpointSeleccionado, formData]);

  return (
    <>
      <NavBar /> {/* Usa el componente NavBar */}

      <div style={styles.container}>
        <h2>Generar Reporte de Novedades</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <label style={styles.label}>
          Selecciona el tipo de reporte de novedades:
          <select onChange={(e) => setEndpointSeleccionado(e.target.value)} style={styles.select}>
            <option value="">Selecciona una opción</option>
            <option value="reporte-novedades">Novedades por rango de fecha</option>
            <option value="novedades-por-fecha-cargo-dependencia">
              Novedades por rango de fecha, cargo o dependencia
            </option>
          </select>
        </label>

        {(endpointSeleccionado === "reporte-novedades" ||
          endpointSeleccionado === "novedades-por-fecha-cargo-dependencia") && (
          <div>
            <label style={styles.label}>
              Fecha Inicio:
              <input
                type="month"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Fecha Fin:
              <input
                type="month"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
          </div>
        )}

        {/* Selector de Dependencia */}
        {endpointSeleccionado === "novedades-por-fecha-cargo-dependencia" && (
          <div>
            <label style={styles.label}>
              Dependencia:
              <select
                name="dependencia"
                value={formData.dependencia}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="">Selecciona una dependencia</option>
                {dependencias.map((dep, index) => (
                  <option key={index} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </label>

            {/* Selector de Cargo, dependiente de la dependencia seleccionada */}
            <label style={styles.label}>
              Cargo:
              <select
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                disabled={!formData.dependencia}
                style={styles.select}
              >
                <option value="">Selecciona un cargo</option>
                {cargos.map((cargo, index) => (
                  <option key={index} value={cargo}>
                    {cargo}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* Previsualización y descarga del PDF */}
        {reporteData && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <PDFViewer style={styles.pdfViewer}>
              {endpointSeleccionado === "reporte-novedades" ? (
                <ConsultasPDF5 data={reporteData} />
              ) : (
                <ConsultasPDF6 data={reporteData} />
              )}
            </PDFViewer>
            <PDFDownloadLink
              document={
                endpointSeleccionado === "reporte-novedades" ? (
                  <ConsultasPDF5 data={reporteData} />
                ) : (
                  <ConsultasPDF6 data={reporteData} />
                )
              }
              fileName="reporte_novedades.pdf"
              style={styles.downloadLink}
            >
              {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
            </PDFDownloadLink>
          </div>
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
  input: {
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

export default ReporteNovedad;
