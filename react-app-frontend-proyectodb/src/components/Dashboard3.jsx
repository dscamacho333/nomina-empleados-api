// Dashboard3.jsx
import React, { useEffect, useState, useRef } from "react";
import { Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Barchart } from "./Barchart";
import { DashboardPDF } from "./DashboardPDF";
import {
  getEmpleadosPorEPSyDependencia,
  getEmpleadosPorPensionYDependencia,
} from "./EmpleadoChart";

const Dashboard3 = () => {
  const [data, setData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("eps");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [chartImage, setChartImage] = useState(null);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  // Cargar datos de EPS y Pensión
  const loadData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Autenticación requerida. Inicie sesión nuevamente.");
        return;
      }

      let response;
      if (selectedDataType === "eps") {
        response = await getEmpleadosPorEPSyDependencia(token);
        setData(
          response[0]?.empleadosPorEPSyDependenciaDTO.filter(
            (item) => item.cantidad > 0
          ) || []
        );
      } else if (selectedDataType === "pension") {
        response = await getEmpleadosPorPensionYDependencia(token);
        setData(
          response[0]?.empleadorPorPensionYDependenciaDTO.filter(
            (item) => item.cantidad > 0
          ) || []
        );
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setError("No se pudieron cargar los datos. Verifique su autenticación.");
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDataType]);

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

  const dataTypeText = selectedDataType === "eps" ? "por EPS" : "por Pensión";
  const pdfTitle = `Dashboard Comparativo de Empleados ${dataTypeText} para Todas las Dependencias`;

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <>
      {/* Encabezado */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Comparativo de Empleados</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      <div
        style={{
          padding: "20px",
          maxWidth: "1400px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Comparativo de Empleados {dataTypeText}
        </Typography>

        <div
          style={{ display: "block", textAlign: "center", marginBottom: "20px" }}
        >
          <Select
            value={selectedDataType}
            onChange={(e) => setSelectedDataType(e.target.value)}
            style={{ marginRight: "10px" }}
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
          <Barchart
            data={data}
            labelKey={selectedDataType}
            dataKey="cantidad"
            groupByKey="dependencia"
            isGrouped={true}
            style={{ width: "100%", height: "100%" }}
          />
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

export default Dashboard3;
