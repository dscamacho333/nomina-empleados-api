import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
  },
  space: {
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  tableCell: {
    width: "33%",
    fontSize: 12,
  },
});

const ConsultasPDF = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Reporte de Empleados</Text>

        {data.empleadosDTO.map((empleado, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.text}>
              ID: {empleado.id} - Nombre Completo: {empleado.primerNombre}{" "}
              {empleado.segundoNombre ? empleado.segundoNombre + " " : ""}
              {empleado.primerApellido}{" "}
              {empleado.segundoApellido ? empleado.segundoApellido : ""}
            </Text>
            <Text style={styles.text}>
              Dependencia: {empleado.dependenciaDTO.nombreDependencia}
            </Text>
            <Text style={styles.text}>
              Cargo: {empleado.cargoDTO.nombreCargo}
            </Text>
            <Text style={styles.text}>Sueldo: {empleado.sueldo}</Text>
            <Text style={styles.text}>
              Fecha de Ingreso:{" "}
              {new Date(empleado.fechaIngreso).toLocaleDateString()}
            </Text>
          </View>
        ))}

        <View style={styles.space} />

        <Text style={styles.header}>Cantidad por Cargo y Dependencia</Text>
        <View style={styles.table}>
          {data.cargoDependenciasDTO.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.cargo}</Text>
              <Text style={styles.tableCell}>{item.dependencia}</Text>
              <Text style={styles.tableCell}>{item.cantidad}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.header}>Cantidad por Dependencia</Text>
        <View style={styles.table}>
          {data.dependenciasDTO.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.dependencia}</Text>
              <Text style={styles.tableCell}>{item.cantidad}</Text>
            </View>
          ))}
        </View>

        {}
        <View style={styles.space} />
        {}
        <Text style={styles.header}>
          Total de Empleados: {data.cantidadTotalEmpleados}
        </Text>
      </Page>
    </Document>
  );
};

export default ConsultasPDF;
