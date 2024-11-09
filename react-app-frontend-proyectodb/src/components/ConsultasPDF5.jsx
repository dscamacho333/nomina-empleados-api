import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
});

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const ConsultasPDF5 = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Reporte de Novedades por Rango de Fecha</Text>
      {data.map((novedad, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>
            Nombre: {novedad.primerNombre} {novedad.primerApellido}
          </Text>
          <Text style={styles.text}>Número de Días: {novedad.numeroDias}</Text>
          <Text style={styles.text}>
            Fecha Inicio Vacaciones: {formatDate(novedad.fechaInicioVacaciones)}
          </Text>
          <Text style={styles.text}>
            Fecha Terminación Vacaciones:{" "}
            {formatDate(novedad.fechaTerminacionVacaciones)}
          </Text>
          <Text style={styles.text}>
            Fecha Inicio Incapacidad:{" "}
            {formatDate(novedad.fechaInicioIncapacidad)}
          </Text>
          <Text style={styles.text}>
            Fecha Terminación Incapacidad:{" "}
            {formatDate(novedad.fechaTerminacionIncapacidad)}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default ConsultasPDF5;
