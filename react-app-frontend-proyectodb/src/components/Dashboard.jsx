import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Barchart } from "./Barchart";
import { Piechart } from "./Piechart";
import { DashboardPDF } from "./DashboardPDF";
import {
  getEmpleadosPorDependencia,
  getEmpleadosPorCargo,
} from "./EmpleadoChart";

export const Dashboard = () => {
  const [dependenciaData, setDependenciaData] = useState([]);
  const [cargoData, setCargoData] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState("barras");
  const [selectedDataType, setSelectedDataType] = useState("dependencia");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [chartImage, setChartImage] = useState(null);
  const chartRef = useRef(null);

  const loadData = async () => {
    try {
      const dependenciaResponse = await getEmpleadosPorDependencia();
      const cargoResponse = await getEmpleadosPorCargo();

      const dependencia = dependenciaResponse[0]?.cantidadDependenciaDTO || [];
      const cargo = cargoResponse[0]?.cantidadCargoDTO || [];

      setDependenciaData(dependencia);
      setCargoData(cargo);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const captureChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imageData = canvas.toDataURL("image/png");
      setChartImage(imageData);
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

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard de Empleados
      </Typography>

      <Select
        value={selectedChartType}
        onChange={(e) => setSelectedChartType(e.target.value)}
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

      <Grid container spacing={3} ref={chartRef}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Gráfico {dataTypeText} {chartTypeText}
          </Typography>
          {selectedChartType === "barras" ? (
            <Barchart
              data={
                selectedDataType === "dependencia" ? dependenciaData : cargoData
              }
              labelKey={
                selectedDataType === "dependencia" ? "dependencia" : "cargo"
              }
              dataKey="cantidad"
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
            />
          )}
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handlePreviewPDF}
        style={{ marginTop: 20 }}
      >
        Previsualizar PDF
      </Button>

      <PDFDownloadLink
        document={<DashboardPDF title={pdfTitle} chartImage={chartImage} />}
        fileName={pdfTitle.replace(/ /g, "_").toLowerCase() + ".pdf"}
        style={{ textDecoration: "none", marginTop: 10 }}
      >
        <Button variant="contained" color="secondary">
          Descargar PDF
        </Button>
      </PDFDownloadLink>

      {showPDFPreview && chartImage && (
        <PDFViewer style={{ width: "100%", height: "500px", marginTop: 20 }}>
          <DashboardPDF title={pdfTitle} chartImage={chartImage} />
        </PDFViewer>
      )}
    </>
  );
};
