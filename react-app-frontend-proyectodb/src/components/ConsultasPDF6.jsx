import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  space: {
    marginBottom: 20,
  },
});

const ConsultasPDF6 = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>
        Detalle de Novedades por Fecha, Cargo y Dependencia
      </Text>
      {data.map((detalle, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>
            Nombre: {detalle.primerNombre} {detalle.primerApellido}
          </Text>
          <Text style={styles.text}>Cargo: {detalle.nombreCargo}</Text>
          <Text style={styles.text}>
            Dependencia: {detalle.nombreDependencia}
          </Text>
          <Text style={styles.text}>
            Total Incapacidades: {detalle.totalIncapacidades}
          </Text>
          <Text style={styles.text}>
            Incapacidades:{" "}
            {detalle.fechaIncapacidadInicio
              ? `${detalle.fechaIncapacidadInicio} a ${detalle.fechaIncapacidadFin}`
              : "No aplica"}
          </Text>
          <Text style={styles.text}>
            Vacaciones:{" "}
            {detalle.vacacionesInicio
              ? `${detalle.vacacionesInicio} a ${detalle.vacacionesFin}`
              : "No aplica"}
          </Text>
          <Text style={styles.text}>
            Días Trabajados: {detalle.diasTrabajados}
          </Text>
          <Text style={styles.text}>Bonificación: {detalle.bonificacion}</Text>
          <Text style={styles.text}>Transporte: {detalle.transporte}</Text>
          <Text style={styles.text}>Salario Total: {detalle.salarioTotal}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default ConsultasPDF6;
