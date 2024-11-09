import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Barchart } from "./Barchart";
import {
  getEmpleadosPorEPSyDependencia,
  getEmpleadosPorPensionYDependencia,
} from "./EmpleadoChart";
import { DashboardPDF } from "./DashboardPDF";

export const Dashboard3 = () => {
  const [data, setData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("eps");
  const [chartImage, setChartImage] = useState(null);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const chartRef = useRef(null);

  const loadData = async () => {
    try {
      let response;
      if (selectedDataType === "eps") {
        response = await getEmpleadosPorEPSyDependencia();
        const data =
          response[0]?.empleadosPorEPSyDependenciaDTO.filter(
            (item) => item.cantidad > 0
          ) || [];
        setData(data);
      } else if (selectedDataType === "pension") {
        response = await getEmpleadosPorPensionYDependencia();
        const data =
          response[0]?.empleadorPorPensionYDependenciaDTO.filter(
            (item) => item.cantidad > 0
          ) || [];
        setData(data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDataType]);

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

  const dataTypeText = selectedDataType === "eps" ? "por EPS" : "por Pensión";
  const pdfTitle = `Dashboard Comparativo de Empleados ${dataTypeText} para Todas las Dependencias`;

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard Comparativo de{" "}
        {selectedDataType === "eps" ? "EPS" : "Pensión"} por Dependencia
      </Typography>

      <Select
        value={selectedDataType}
        onChange={(e) => setSelectedDataType(e.target.value)}
        displayEmpty
        style={{ marginBottom: 20 }}
      >
        <MenuItem value="eps">EPS</MenuItem>
        <MenuItem value="pension">Pensión</MenuItem>
      </Select>

      <Grid container spacing={3}>
        <Grid item xs={12} ref={chartRef}>
          <Typography variant="h6">
            Gráfico Comparativo de{" "}
            {selectedDataType === "eps" ? "EPS" : "Pensión"} para Todas las
            Dependencias
          </Typography>
          <Barchart
            data={data}
            labelKey={selectedDataType}
            dataKey="cantidad"
            groupByKey="dependencia"
            isGrouped={true}
          />
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
