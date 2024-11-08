// src/components/Dashboard3.jsx

import React, { useEffect, useState } from "react";
import { Grid, Typography, Select, MenuItem } from "@mui/material";
import { Barchart } from "./Barchart";
import {
  getEmpleadosPorEPSyDependencia,
  getEmpleadosPorPensionYDependencia,
} from "./EmpleadoChart";

export const Dashboard3 = () => {
  const [data, setData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("eps");

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

  return (
    <>
      <Typography variant="h4" gutterBottom>
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
        <Grid item xs={12}>
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
    </>
  );
};
