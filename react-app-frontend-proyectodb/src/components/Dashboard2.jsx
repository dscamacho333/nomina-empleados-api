import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Histogram } from "./Histogram";
import { getEmpleadosPorEPS, getEmpleadosPorPension } from "./EmpleadoChart";
import { DashboardPDF } from "./DashboardPDF";

export const Dashboard2 = () => {
  const [epsData, setEpsData] = useState([]);
  const [pensionData, setPensionData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("eps");
  const [chartImage, setChartImage] = useState(null);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const chartRef = useRef(null);

  const loadData = async () => {
    try {
      const epsResponse = await getEmpleadosPorEPS();
      const pensionResponse = await getEmpleadosPorPension();

      const eps = epsResponse[0]?.cantidadEPSDTO || [];
      const pension = pensionResponse[0]?.cantidadPensionDTO || [];

      setEpsData(eps);
      setPensionData(pension);
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

  const dataTypeText = selectedDataType === "eps" ? "por EPS" : "por Pensión";
  const pdfTitle = `Dashboard de Empleados ${dataTypeText} en Histograma`;

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard de Histogramas de EPS y Pensión
      </Typography>

      <Select
        value={selectedDataType}
        onChange={(e) => setSelectedDataType(e.target.value)}
      >
        <MenuItem value="eps">EPS</MenuItem>
        <MenuItem value="pension">Pensión</MenuItem>
      </Select>

      <Grid container spacing={3}>
        <Grid item xs={12} ref={chartRef}>
          <Typography variant="h6">Histograma de {dataTypeText}</Typography>
          <Histogram
            data={selectedDataType === "eps" ? epsData : pensionData}
            labelKey={selectedDataType === "eps" ? "eps" : "pension"}
            dataKey="cantidad"
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
