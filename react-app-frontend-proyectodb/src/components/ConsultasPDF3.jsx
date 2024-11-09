import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 12,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: "#cccccc",
  },
});

const ConsultasPDF3 = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Reporte de Información Individual</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre Completo:</Text>
            <Text style={styles.value}>
              {data.primerNombre} {data.primerApellido}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cargo:</Text>
            <Text style={styles.value}>{data.nombreCargo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Dependencia:</Text>
            <Text style={styles.value}>{data.nombreDependencia}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Sueldo:</Text>
            <Text style={styles.value}>${data.sueldo.toLocaleString()}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>EPS:</Text>
            <Text style={styles.value}>{data.nombreEPS}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Pensión:</Text>
            <Text style={styles.value}>{data.nombrePension}</Text>
          </View>
        </View>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Sección de novedades */}
        <Text style={styles.header}>Novedades</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Días Trabajados:</Text>
            <Text style={styles.value}>{data.diasTrabajados}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Bonificación:</Text>
            <Text style={styles.value}>
              ${data.bonificacion.toLocaleString()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Transporte:</Text>
            <Text style={styles.value}>
              ${data.transporte.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Sección de vacaciones */}
        <Text style={styles.header}>Vacaciones</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Inicio:</Text>
            <Text style={styles.value}>
              {data.vacacionesInicio
                ? new Date(data.vacacionesInicio).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Fin:</Text>
            <Text style={styles.value}>
              {data.vacacionesFin
                ? new Date(data.vacacionesFin).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
        </View>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Sección de incapacidades */}
        <Text style={styles.header}>Incapacidades</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Inicio:</Text>
            <Text style={styles.value}>
              {data.incapacidadInicio
                ? new Date(data.incapacidadInicio).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Fin:</Text>
            <Text style={styles.value}>
              {data.incapacidadFin
                ? new Date(data.incapacidadFin).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ConsultasPDF3;
