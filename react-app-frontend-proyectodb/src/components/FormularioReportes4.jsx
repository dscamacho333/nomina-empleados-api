import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ConsultasPDF5 from "./ConsultasPDF5";
import ConsultasPDF6 from "./ConsultasPDF6";

const FormularioReportes2 = () => {
  const [endpointSeleccionado, setEndpointSeleccionado] = useState("");
  const [formData, setFormData] = useState({
    fechaInicio: "",
    fechaFin: "",
    dependencia: "",
    cargo: "",
  });
  const [reporteData, setReporteData] = useState(null);
  const [cargos, setCargos] = useState([]);

  const dependencias = [
    "Comercial",
    "Contabilidad",
    "Facturacion",
    "Tecnologia",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const obtenerCargos = async (nombreDependencia) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/consultas/v1/${nombreDependencia}/cargos`
      );
      if (response.ok) {
        const data = await response.json();
        setCargos(data);
      } else {
        console.error("Error al obtener cargos");
      }
    } catch (error) {
      console.error("Error en la solicitud de cargos:", error);
    }
  };

  useEffect(() => {
    if (formData.dependencia) {
      obtenerCargos(formData.dependencia);
    }
  }, [formData.dependencia]);

  const obtenerDatos = async () => {
    if (!endpointSeleccionado) return;

    const convertirFecha = (fecha) => {
      const [year, month] = fecha.split("-");
      return `${month}/${year}`;
    };

    const fechaInicio = convertirFecha(formData.fechaInicio);
    const fechaFin = convertirFecha(formData.fechaFin);

    let url = `http://localhost:8080/api/consultas/v1/${endpointSeleccionado}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;

    if (formData.dependencia) {
      url += `&dependencia=${formData.dependencia}`;
    }
    if (formData.cargo) {
      url += `&cargo=${formData.cargo}`;
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setReporteData(data);
      } else {
        console.error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error en la solicitud de datos:", error);
    }
  };

  useEffect(() => {
    if (endpointSeleccionado) {
      obtenerDatos();
    }
  }, [endpointSeleccionado, formData]);

  return (
    <div>
      <h1>Generar Reporte de Novedades</h1>

      <label>
        Selecciona el tipo de reporte de novedades:
        <select onChange={(e) => setEndpointSeleccionado(e.target.value)}>
          <option value="">Selecciona una opción</option>
          <option value="reporte-novedades">
            Novedades por rango de fecha
          </option>
          <option value="novedades-por-fecha-cargo-dependencia">
            Novedades por rango de fecha, cargo o dependencia
          </option>
        </select>
      </label>

      {(endpointSeleccionado === "reporte-novedades" ||
        endpointSeleccionado === "novedades-por-fecha-cargo-dependencia") && (
        <div>
          <label>
            Fecha Inicio:
            <input
              type="month"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Fecha Fin:
            <input
              type="month"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleInputChange}
            />
          </label>
        </div>
      )}

      {/* Selector de Dependencia */}
      {endpointSeleccionado === "novedades-por-fecha-cargo-dependencia" && (
        <div>
          <label>
            Dependencia:
            <select
              name="dependencia"
              value={formData.dependencia}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una dependencia</option>
              {dependencias.map((dep, index) => (
                <option key={index} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </label>

          {/* Selector de Cargo, dependiente de la dependencia seleccionada */}
          <label>
            Cargo:
            <select
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
              disabled={!formData.dependencia}
            >
              <option value="">Selecciona un cargo</option>
              {cargos.map((cargo, index) => (
                <option key={index} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Previsualización y descarga del PDF */}
      {reporteData && (
        <>
          <PDFViewer style={{ width: "100%", height: "500px", marginTop: 20 }}>
            {endpointSeleccionado === "reporte-novedades" ? (
              <ConsultasPDF5 data={reporteData} />
            ) : (
              <ConsultasPDF6 data={reporteData} />
            )}
          </PDFViewer>
          <PDFDownloadLink
            document={
              endpointSeleccionado === "reporte-novedades" ? (
                <ConsultasPDF5 data={reporteData} />
              ) : (
                <ConsultasPDF6 data={reporteData} />
              )
            }
            fileName="reporte_novedades.pdf"
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
