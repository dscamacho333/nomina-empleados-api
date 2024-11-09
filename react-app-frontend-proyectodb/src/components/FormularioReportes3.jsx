import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF4 from "./ConsultasPDF4";

const FormularioReportes3 = () => {
  const [ordenNombre, setOrdenNombre] = useState("asc");
  const [reporteData, setReporteData] = useState(null);

  const handleInputChange = (e) => {
    setOrdenNombre(e.target.value);
  };

  const obtenerDatos = async () => {
    const url = `http://localhost:8080/api/consultas/v1/empleados-por-cargo-eps-pension?ordenNombre=${ordenNombre}`;
    const response = await fetch(url);
    const data = await response.json();
    setReporteData(data);
  };

  useEffect(() => {
    obtenerDatos();
  }, [ordenNombre]);

  return (
    <div>
      <h1>Generar Reporte de Salud y Pensión</h1>

      <label>
        Ordenar nombres:
        <select
          name="ordenNombre"
          value={ordenNombre}
          onChange={handleInputChange}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>

      {reporteData && (
        <>
          <PDFViewer style={{ width: "100%", height: "500px", marginTop: 20 }}>
            <ConsultasPDF4 data={reporteData} />
          </PDFViewer>
          <PDFDownloadLink
            document={<ConsultasPDF4 data={reporteData} />}
            fileName="reporte_salud_pension.pdf"
            style={{ marginTop: 10 }}
          >
            {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
          </PDFDownloadLink>
        </>
      )}
    </div>
  );
};

export default FormularioReportes3;
