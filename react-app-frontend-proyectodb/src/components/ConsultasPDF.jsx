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
});

const ConsultasPDF = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Reporte de Empleados Ordenados</Text>

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

        <Text style={styles.header}>
          Total de Empleados: {data.cantidadTotalEmpleados}
        </Text>
      </Page>
    </Document>
  );
};

export default ConsultasPDF;
