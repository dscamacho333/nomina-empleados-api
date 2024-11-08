import React, { useEffect, useState } from "react";
import { Grid, Typography, Select, MenuItem } from "@mui/material";
import { Barchart } from "./Barchart";
import { Piechart } from "./Piechart";
import {
  getEmpleadosPorDependencia,
  getEmpleadosPorCargo,
} from "./EmpleadoChart";

export const Dashboard = () => {
  const [dependenciaData, setDependenciaData] = useState([]);
  const [cargoData, setCargoData] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState("barras");
  const [selectedDataType, setSelectedDataType] = useState("dependencia");

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

  // useEffect para recargar los datos al cambiar la selección
  useEffect(() => {
    loadData();
  }, [selectedChartType, selectedDataType]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard de Empleados
      </Typography>

      {/* Select para elegir tipo de gráfico */}
      <Select
        value={selectedChartType}
        onChange={(e) => setSelectedChartType(e.target.value)}
      >
        <MenuItem value="barras">Gráfico de Barras</MenuItem>
        <MenuItem value="torta">Gráfico Circular</MenuItem>
      </Select>

      {/* Select para elegir tipo de dato */}
      <Select
        value={selectedDataType}
        onChange={(e) => setSelectedDataType(e.target.value)}
      >
        <MenuItem value="dependencia">Dependencia</MenuItem>
        <MenuItem value="cargo">Cargo</MenuItem>
      </Select>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Gráfico -{" "}
            {selectedDataType.charAt(0).toUpperCase() +
              selectedDataType.slice(1)}{" "}
            -{" "}
            {selectedChartType.charAt(0).toUpperCase() +
              selectedChartType.slice(1)}
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
    </>
  );
};
