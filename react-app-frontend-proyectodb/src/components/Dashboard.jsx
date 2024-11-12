import React, { useEffect, useState, useRef } from "react";
import { Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Barchart } from "./Barchart";
import { Piechart } from "./Piechart";
import { DashboardPDF } from "./DashboardPDF";
import {
  getEmpleadosPorDependencia,
  getEmpleadosPorCargo,
} from "./EmpleadoChart";
import NavBarReporteNomina from "./NavBarReporteNomina"; // Importa NavBarReporteNomina

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

  const chartTypeText =
    selectedChartType === "barras" ? "en Barras" : "Circular";
  const dataTypeText =
    selectedDataType === "dependencia" ? "por Dependencia" : "por Cargo";
  const pdfTitle = `Dashboard de Empleados ${dataTypeText} ${chartTypeText}`;

  // Refrescar gráfico cuando se cambia el tipo de gráfico o el tipo de datos
  useEffect(() => {
    if (selectedChartType || selectedDataType) {
      loadData();
    }
  }, [selectedChartType, selectedDataType]);

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <>
      {/* Utiliza NavBarReporteNomina */}
      <NavBarReporteNomina />

      <div
        style={{
          padding: "20px",
          maxWidth: "1400px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Gráficos de Empleados
        </Typography>

        <div
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
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
            width: "100vh",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {selectedChartType === "barras" ? (
            <Barchart
              data={
                selectedDataType === "dependencia" ? dependenciaData : cargoData
              }
              labelKey={
                selectedDataType === "dependencia" ? "dependencia" : "cargo"
              }
              dataKey="cantidad"
              style={{ width: "100vh", height: "100vh" }}
            />
          ) : (
            <Piechart
              data={
                selectedDataType === "dependencia" ? dependenciaData : cargoData
              }
              labelKey={
                selectedDataType === "dependencia" ? "dependencia" : "cargo"
              }
              dataKey="cantidad"
              style={{ width: "100vh", height: "100vh" }}
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

export default Dashboard;
