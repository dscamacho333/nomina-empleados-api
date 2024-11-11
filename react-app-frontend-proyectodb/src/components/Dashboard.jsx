import React, { useEffect, useState, useRef } from "react";
import { Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Barchart } from "./Barchart";
import { Piechart } from "./Piechart";
import { DashboardPDF } from "./DashboardPDF";
import { getEmpleadosPorDependencia, getEmpleadosPorCargo } from "./EmpleadoChart";

const Dashboard = () => {
  const [dependenciaData, setDependenciaData] = useState([]);
  const [cargoData, setCargoData] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState("barras");
  const [selectedDataType, setSelectedDataType] = useState("dependencia");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [chartImage, setChartImage] = useState(null);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  // Cargar datos de dependencia y cargo con autenticación
  const loadData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setError("Autenticación requerida. Inicie sesión nuevamente.");
        return;
      }

      const dependenciaResponse = await getEmpleadosPorDependencia(token);
      const cargoResponse = await getEmpleadosPorCargo(token);

      setDependenciaData(dependenciaResponse[0]?.cantidadDependenciaDTO || []);
      setCargoData(cargoResponse[0]?.cantidadCargoDTO || []);
    } catch (err) {
      console.error("Error al cargar los datos:", err);
      setError("No se pudieron cargar los datos. Verifique su autenticación.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Captura la imagen del gráfico para el PDF
  const captureChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      setChartImage(canvas.toDataURL("image/png"));
    }
  };

  const handlePreviewPDF = async () => {
    await captureChart();
    setShowPDFPreview(true);
  };

  const chartTypeText = selectedChartType === "barras" ? "en Barras" : "Circular";
  const dataTypeText = selectedDataType === "dependencia" ? "por Dependencia" : "por Cargo";
  const pdfTitle = `Dashboard de Empleados ${dataTypeText} ${chartTypeText}`;

  // Refrescar gráfico cuando se cambia el tipo de gráfico o el tipo de datos
  useEffect(() => {
    if (selectedChartType || selectedDataType) {
      loadData();
    }
  }, [selectedChartType, selectedDataType]);

  if (error) {
    return <Typography color="error" align="center" variant="h6">{error}</Typography>;
  }

  return (
    <>
      {/* Encabezado */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Graficos de Empleados</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      <div style={{ padding: "20px", maxWidth: "1400px", margin: "auto", marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Graficos de Empleados
        </Typography>

        <div style={{ display: "block", textAlign: "center", marginBottom: "20px" }}>
          <Select
            value={selectedChartType}
            onChange={(e) => setSelectedChartType(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <MenuItem value="barras">Gráfico de Barras</MenuItem>
            <MenuItem value="torta">Gráfico Circular</MenuItem>
          </Select>

          <Select
            value={selectedDataType}
            onChange={(e) => setSelectedDataType(e.target.value)}
          >
            <MenuItem value="dependencia">Dependencia</MenuItem>
            <MenuItem value="cargo">Cargo</MenuItem>
          </Select>
        </div>

        <div
          ref={chartRef}
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {selectedChartType === "barras" ? (
            <Barchart
              data={selectedDataType === "dependencia" ? dependenciaData : cargoData}
              labelKey={selectedDataType === "dependencia" ? "dependencia" : "cargo"}
              dataKey="cantidad"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Piechart
              data={selectedDataType === "dependencia" ? dependenciaData : cargoData}
              labelKey={selectedDataType === "dependencia" ? "dependencia" : "cargo"}
              dataKey="cantidad"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviewPDF}
            style={{ marginRight: "10px" }}
          >
            Previsualizar PDF
          </Button>

          <PDFDownloadLink
            document={<DashboardPDF title={pdfTitle} chartImage={chartImage} />}
            fileName={pdfTitle.replace(/ /g, "_").toLowerCase() + ".pdf"}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="secondary">
              Descargar PDF
            </Button>
          </PDFDownloadLink>
        </div>

        {showPDFPreview && chartImage && (
          <PDFViewer style={{ width: "100%", height: "700px", marginTop: 20 }}>
            <DashboardPDF title={pdfTitle} chartImage={chartImage} />
          </PDFViewer>
        )}
      </div>
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
};

export default Dashboard;
