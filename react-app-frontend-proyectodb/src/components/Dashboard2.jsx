import React, { useEffect, useState } from "react";
import { Grid, Typography, Select, MenuItem } from "@mui/material";
import { Histogram } from "./Histogram";
import { getEmpleadosPorEPS, getEmpleadosPorPension } from "./EmpleadoChart";

export const Dashboard2 = () => {
  const [epsData, setEpsData] = useState([]);
  const [pensionData, setPensionData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("eps");

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

  return (
    <>
      <Typography variant="h4" gutterBottom>
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
        <Grid item xs={12}>
          <Typography variant="h6">
            Histograma de{" "}
            {selectedDataType.charAt(0).toUpperCase() +
              selectedDataType.slice(1)}
          </Typography>
          <Histogram
            data={selectedDataType === "eps" ? epsData : pensionData}
            labelKey={selectedDataType === "eps" ? "eps" : "pension"}
            dataKey="cantidad"
          />
        </Grid>
      </Grid>
    </>
  );
};
