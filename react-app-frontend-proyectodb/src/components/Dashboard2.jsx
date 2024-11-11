// Dashboard2.jsx
import React, { useEffect, useState, useRef } from "react";
import { Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Histogram } from "./Histogram";
import { getEmpleadosPorEPS, getEmpleadosPorPension } from "./EmpleadoChart";
import { DashboardPDF } from "./DashboardPDF";

const Dashboard2 = () => {
  const [epsData, setEpsData] = useState([]);
  const [pensionData, setPensionData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("eps");
  const [chartImage, setChartImage] = useState(null);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const chartRef = useRef(null);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Token de autenticación no encontrado. Inicie sesión.");
        return;
      }

      const epsResponse = await getEmpleadosPorEPS(token);
      const pensionResponse = await getEmpleadosPorPension(token);

      setEpsData(epsResponse[0]?.cantidadEPSDTO || []);
      setPensionData(pensionResponse[0]?.cantidadPensionDTO || []);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setError("Error al cargar los datos. Verifique su autenticación.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const dataTypeText = selectedDataType === "eps" ? "por EPS" : "por Pensión";
  const pdfTitle = `Dashboard de Empleados ${dataTypeText} en Histograma`;

  return (
    <>
      {/* Encabezado */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Histograma de Empleados</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      <div style={{ padding: "20px", maxWidth: "1400px", margin: "auto", marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Dashboard de Histogramas de EPS y Pensión
        </Typography>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <Select
            value={selectedDataType}
            onChange={(e) => setSelectedDataType(e.target.value)}
            style={{ marginRight: 10 }}
          >
            <MenuItem value="eps">EPS</MenuItem>
            <MenuItem value="pension">Pensión</MenuItem>
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
          <Histogram
            data={selectedDataType === "eps" ? epsData : pensionData}
            labelKey={selectedDataType === "eps" ? "eps" : "pension"}
            dataKey="cantidad"
          />
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={handlePreviewPDF} style={{ marginRight: 10 }}>
            Previsualizar PDF
          </Button>

          <PDFDownloadLink
            document={<DashboardPDF title={pdfTitle} chartImage={chartImage} />}
            fileName={pdfTitle.replace(/ /g, "_").toLowerCase() + ".pdf"}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="secondary">Descargar PDF</Button>
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

export default Dashboard2;
