import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica" },
  header: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  section: { marginBottom: 10 },
  text: { fontSize: 12 },
  table: { display: "table", width: "auto", marginBottom: 20 },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "33%", borderStyle: "solid", borderWidth: 1, padding: 5 },
  tableCell: { fontSize: 10, textAlign: "center" },
});

const ConsultasPDF4 = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Reporte de Empleados por Cargo, EPS e</Text>
      <Text style={styles.header}>Institución de Pensión</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Cargo</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>EPS</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Pensión</Text>
          </View>
        </View>
        {data.empleadosDTO.map((empleado, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {empleado.primerNombre}{" "}
                {empleado.segundoNombre ? empleado.segundoNombre + " " : ""}
                {empleado.primerApellido}{" "}
                {empleado.segundoApellido ? empleado.segundoApellido : ""}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {empleado.cargoDTO.nombreCargo}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{empleado.epsDTO.nombreEPS}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {empleado.pensionDTO.nombrePension}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ConsultasPDF4;
