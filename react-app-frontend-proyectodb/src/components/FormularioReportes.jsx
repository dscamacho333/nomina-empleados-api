import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF from "./ConsultasPDF";
import ConsultasPDF2 from "./ConsultasPDF2";

const FormularioReportes = () => {
  const [endpointSeleccionado, setEndpointSeleccionado] = useState("");
  const [formData, setFormData] = useState({
    ordenarPor: "primerNombre",
    ordenNombre: "asc",
  });
  const [reporteData, setReporteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEndpointChange = (e) => {
    setEndpointSeleccionado(e.target.value);
    setReporteData(null);
  };

  const obtenerDatos = async () => {
    if (!endpointSeleccionado) return;

    setIsLoading(true);
    let url = "";

    if (endpointSeleccionado === "empleados-ordenados") {
      url = `http://localhost:8080/api/consultas/v1/empleados-ordenados?ordenarPor=${formData.ordenarPor}`;
    } else if (endpointSeleccionado === "empleados-por-cargo-dependencia") {
      url = `http://localhost:8080/api/consultas/v1/empleados-por-cargo-dependencia?ordenNombre=${formData.ordenNombre}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setReporteData(data);
    } catch (error) {
      console.error("Error al cargar el reporte:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (endpointSeleccionado) {
      obtenerDatos();
    }
  }, [endpointSeleccionado, formData]);

  return (
    <div>
      <h1>Generar Reporte de Nómina</h1>

      {/* Selección del tipo de reporte de nómina */}
      <label>
        Selecciona el tipo de reporte de nómina:
        <select onChange={handleEndpointChange}>
          <option value="">Selecciona una opción</option>
          <option value="empleados-ordenados">
            Lista de empleados ordenados
          </option>
          <option value="empleados-por-cargo-dependencia">
            Cantidad y lista de empleados por cargo y dependencia
          </option>
        </select>
      </label>

      {endpointSeleccionado === "empleados-ordenados" && (
        <div>
          <label>
            Ordenar por:
            <select
              name="ordenarPor"
              value={formData.ordenarPor}
              onChange={handleInputChange}
            >
              <option value="primerNombre">Nombre</option>
              <option value="dependencia">Dependencia</option>
            </select>
          </label>
        </div>
      )}

      {endpointSeleccionado === "empleados-por-cargo-dependencia" && (
        <div>
          <label>
            Ordenar nombres:
            <select
              name="ordenNombre"
              value={formData.ordenNombre}
              onChange={handleInputChange}
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </label>
        </div>
      )}

      {/* Previsualización y descarga del PDF */}
      {isLoading ? (
        <p>Cargando reporte...</p>
      ) : (
        reporteData && (
          <>
            <PDFViewer
              style={{ width: "100%", height: "500px", marginTop: 20 }}
            >
              {endpointSeleccionado === "empleados-ordenados" ? (
                <ConsultasPDF data={reporteData} />
              ) : (
                <ConsultasPDF2 data={reporteData} />
              )}
            </PDFViewer>
            <PDFDownloadLink
              document={
                endpointSeleccionado === "empleados-ordenados" ? (
                  <ConsultasPDF data={reporteData} />
                ) : (
                  <ConsultasPDF2 data={reporteData} />
                )
              }
              fileName="reporte_nomina.pdf"
              style={{ marginTop: 10 }}
            >
              {({ loading }) =>
                loading ? "Generando PDF..." : "Descargar PDF"
              }
            </PDFDownloadLink>
          </>
        )
      )}
    </div>
  );
};

export default FormularioReportes;
