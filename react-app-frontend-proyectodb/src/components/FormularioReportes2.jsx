import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF3 from "./ConsultasPDF3";

const FormularioReportes2 = () => {
  const [idEmpleado, setIdEmpleado] = useState("");
  const [empleadoIDs, setEmpleadoIDs] = useState([]);
  const [reporteData, setReporteData] = useState(null);

  useEffect(() => {
    const fetchEmpleadoIDs = async () => {
      const response = await fetch(
        "http://localhost:8080/api/empleado/v1/listar-ids"
      );
      const data = await response.json();
      setEmpleadoIDs(data);
    };

    fetchEmpleadoIDs();
  }, []);

  const handleInputChange = (e) => {
    setIdEmpleado(e.target.value);
  };

  const obtenerDatos = async () => {
    if (!idEmpleado) return;

    const url = `http://localhost:8080/api/consultas/v1/empleado-informacion?idEmpleado=${idEmpleado}`;

    const response = await fetch(url);
    const data = await response.json();
    setReporteData(data);
  };

  useEffect(() => {
    if (idEmpleado) {
      obtenerDatos();
    }
  }, [idEmpleado]);

  return (
    <div>
      <h1>Generar Reporte de Información Individual</h1>

      <label>
        Selecciona el empleado:
        <select
          name="idEmpleado"
          value={idEmpleado}
          onChange={handleInputChange}
        >
          <option value="">Selecciona un ID</option>
          {empleadoIDs.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </label>

      {/* Previsualización y descarga del PDF */}
      {reporteData && (
        <>
          <PDFViewer style={{ width: "100%", height: "500px", marginTop: 20 }}>
            <ConsultasPDF3 data={reporteData} />
          </PDFViewer>
          <PDFDownloadLink
            document={<ConsultasPDF3 data={reporteData} />}
            fileName="reporte_informacion_individual.pdf"
            style={{ marginTop: 10 }}
          >
            {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
          </PDFDownloadLink>
        </>
      )}
    </div>
  );
};

export default FormularioReportes2;
